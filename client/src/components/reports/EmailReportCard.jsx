import { useState } from "react";
import toast from "react-hot-toast";

import { sendMonthlyReport } from "../../api/reportApi";

function EmailReportCard({ report, onEmailSuccess }) {
  const [isSending, setIsSending] = useState(false);

  if (!report) return null;

  const { month, year, emailSent, emailSentAt, emailFailureReason } = report;

  async function handleSendEmail() {
    setIsSending(true);
    try {
      const response = await sendMonthlyReport(month, year);
      toast.success("Monthly report sent to email!");
      if (onEmailSuccess) {
        onEmailSuccess(response.data?.report || response.data || response);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send email. Please try again later.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  }

  const formattedDate = emailSentAt ? new Date(emailSentAt).toLocaleString() : "";

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Deliver to Email</h3>
          <p className="mt-1 text-xs text-slate-500">
            Receive a beautifully formatted copy of this AI report in your inbox.
          </p>

          {emailSent ? (
            <p className="mt-3 text-xs text-emerald-300 font-medium">
              Sent successfully on {formattedDate}
            </p>
          ) : emailFailureReason ? (
            <p className="mt-3 text-xs text-red-400 font-medium">
              Failed to send: {emailFailureReason}
            </p>
          ) : (
            <p className="mt-3 text-xs text-slate-400">
              Not sent yet.
            </p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={isSending || emailSent}
            className={`w-full sm:w-auto rounded-xl px-5 py-3 text-xs font-semibold transition disabled:cursor-not-allowed ${
              emailSent
                ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                : "bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.08]"
            }`}
          >
            {isSending ? "Sending Email..." : emailSent ? "Sent to Inbox ✓" : "Send to Email ✉"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailReportCard;
