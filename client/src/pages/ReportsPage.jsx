import { useState } from "react";

import { generateMonthlyReport } from "../api/reportApi";

import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import ReportGenerator from "../components/reports/ReportGenerator";
import ReportPreview from "../components/reports/ReportPreview";
import EmailReportCard from "../components/reports/EmailReportCard";

function ReportsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [report, setReport] = useState(null);

  // Keep track of the active month/year that was queried
  const [queryInfo, setQueryInfo] = useState(null);

  async function handleGenerate(month, year) {
    setIsLoading(true);
    setErrorMsg("");
    setReport(null);
    setQueryInfo({ month, year });

    try {
      const response = await generateMonthlyReport(month, year);
      setReport(response?.data?.report || response?.data || response);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to generate monthly report. Please check if transactions exist for this period.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleEmailSuccess(updatedReport) {
    setReport(updatedReport);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Insights"
        title="Monthly Reports"
        description="Compile your monthly income and expenses into an AI-generated spending summary. Review insights and email them to your registered account."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Generate Form */}
        <div>
          <ReportGenerator onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Right Column: Preview & Email */}
        <div className="space-y-6">
          {/* Initial State */}
          {!isLoading && !errorMsg && !report && (
            <div className="grid min-h-[300px] place-items-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center">
              <div>
                <p className="text-sm font-semibold text-white">No report loaded</p>
                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
                  Select a billing month and year on the left, then click &apos;Generate AI Summary&apos; to process insights.
                </p>
              </div>
            </div>
          )}

          {/* Loading Progress */}
          {isLoading && (
            <div className="py-12">
              <LoadingState message="FinSentry AI is fetching transaction records and generating insights..." />
            </div>
          )}

          {/* Error boundary */}
          {!isLoading && errorMsg && (
            <ErrorState
              title="Report Generation Failed"
              message={errorMsg}
              onRetry={() => handleGenerate(queryInfo.month, queryInfo.year)}
            />
          )}

          {/* Report presentation */}
          {!isLoading && report && (
            <div className="space-y-6">
              <EmailReportCard report={report} onEmailSuccess={handleEmailSuccess} />
              
              <ReportPreview report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;