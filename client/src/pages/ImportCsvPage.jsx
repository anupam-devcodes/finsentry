import { useState } from "react";
import toast from "react-hot-toast";

import { importTransactionsCsv } from "../api/transactionApi";

import PageHeader from "../components/common/PageHeader";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import CSVUploadBox from "../components/import/CSVUploadBox";
import CSVFormatGuide from "../components/import/CSVFormatGuide";
import ImportResultCard from "../components/import/ImportResultCard";

function ImportCsvPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  // Result state
  const [importResult, setImportResult] = useState(null);

  function handleFileSelect(selectedFile) {
    setFile(selectedFile);
    setErrorMsg("");
    setValidationErrors([]);
    setImportResult(null);
  }

  function handleClear() {
    setFile(null);
    setErrorMsg("");
    setValidationErrors([]);
    setImportResult(null);
  }

  async function handleImport() {
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    setValidationErrors([]);
    setImportResult(null);

    try {
      const response = await importTransactionsCsv(file);

      const parsedData = response?.data || {};
      setImportResult({
        totalRows: parsedData.totalRows || 0,
        importedCount: parsedData.importedCount || 0,
      });

      toast.success("CSV imported successfully!");
    } catch (err) {
      const responseData = err?.response?.data || {};
      const msg = responseData.message || err?.message || "Import failed. Please verify format.";
      
      setErrorMsg(msg);
      
      if (Array.isArray(responseData.errors)) {
        setValidationErrors(responseData.errors);
      }
      toast.error("Import failed");
    } finally {
      setIsUploading(false);
    }
  }

  function handleReset() {
    handleClear();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Data Import"
        title="CSV Bulk Import"
        description="Migrate records from bank statements or spreadsheets into your ledger by uploading a CSV file. Review instructions for required columns."
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Left Column: Upload */}
        <div className="space-y-4">
          <CSVUploadBox
            onFileSelect={handleFileSelect}
            file={file}
            onClear={handleClear}
          />

          {file && !isUploading && !importResult && (
            <button
              type="button"
              onClick={handleImport}
              className="w-full rounded-2xl bg-emerald-400 py-3.5 text-sm font-semibold text-[#06100B] transition hover:bg-emerald-300 shadow-lg"
            >
              Start CSV Import ⚡
            </button>
          )}
        </div>

        {/* Right Column: Guide or Status/Result */}
        <div className="space-y-6">
          {/* Uploading screen */}
          {isUploading && (
            <div className="py-12">
              <LoadingState message="Uploading spreadsheet and inserting records..." />
            </div>
          )}

          {/* Success screen */}
          {!isUploading && importResult && (
            <ImportResultCard
              importedCount={importResult.importedCount}
              totalRows={importResult.totalRows}
              onReset={handleReset}
            />
          )}

          {/* Error screen */}
          {!isUploading && !importResult && errorMsg && (
            <div className="space-y-4">
              <ErrorState
                title="Spreadsheet Parsing Failed"
                message={errorMsg}
                onRetry={handleImport}
              />

              {/* Row-by-row validation details */}
              {validationErrors.length > 0 && (
                <div className="rounded-3xl border border-red-500/20 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <h4 className="text-sm font-semibold text-red-200">
                    Row-by-Row Validation Failures
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Please correct the following rows in your CSV file and try again.
                  </p>

                  <div className="mt-4 max-h-[300px] overflow-y-auto divide-y divide-white/5 pr-2">
                    {validationErrors.map((rowErr, index) => (
                      <div key={index} className="py-3 text-xs">
                        <p className="font-semibold text-white">
                          Row {rowErr.row}
                        </p>
                        <div className="mt-1.5 space-y-1 pl-3 text-slate-400">
                          {rowErr.errors?.map((subErr, subIdx) => (
                            <p key={subIdx}>
                              • Field <span className="font-mono text-red-300 font-bold">{subErr.field}</span>: {subErr.message}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Default Guide screen */}
          {!isUploading && !importResult && !errorMsg && <CSVFormatGuide />}
        </div>
      </div>
    </div>
  );
}

export default ImportCsvPage;