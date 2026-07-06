import { useState } from "react";
import toast from "react-hot-toast";

import { sendMonthlyReport } from "../../api/reportApi";

function getFriendlyEmailError(error) {
  const backendMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "";

  const lowerMessage = backendMessage.toLowerCase();

  const isResendTestModeError =
    lowerMessage.includes("you can only send testing emails") ||
    lowerMessage.includes("verify a domain") ||
    lowerMessage.includes("resend.com/domains") ||
    lowerMessage.includes("onboarding@resend.dev");

  if (isResendTestModeError) {
    return {
      title: "Email delivery is in test mode",
      message:
        "Reports can only be sent to the verified Resend account email until a sending domain is verified.",
      helper:
        "For demo testing, register with your verified Resend email or configure a verified domain in Resend.",
    };
  }

  return {
    title: "Email could not be sent",
    message:
      backendMessage || "Failed to send email. Please try again later.",
    helper: "",
  };
}

function EmailReportCard({ report, onEmailSuccess }) {
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState("");

  if (!report) return null;

  const { month, year, emailSent, emailSentAt, emailFailureReason } = report;

  async function handleSendEmail() {
    setIsSending(true);
    setEmailError("");

    try {
      const response = await sendMonthlyReport(month, year);

      toast.success("Monthly report sent to your email.");

      if (onEmailSuccess) {
        onEmailSuccess(response.data?.report || response.data || response);
      }
    } catch (err) {
      const friendlyError = getFriendlyEmailError(err);

      setEmailError(friendlyError.message);

      toast.error(friendlyError.message, {
        duration: 7000,
      });
    } finally {
      setIsSending(false);
    }
  }

  const formattedDate = emailSentAt
    ? new Date(emailSentAt).toLocaleString()
    : "";

  const visibleFailureReason = emailError || emailFailureReason;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0B111C] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Deliver to Email
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Send a copy of this AI-generated monthly report to your registered
            email address.
          </p>

          {emailSent ? (
            <p className="mt-3 text-xs font-medium leading-5 text-emerald-300">
              Sent successfully on {formattedDate}
            </p>
          ) : visibleFailureReason ? (
            <div className="mt-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3">
              <p className="text-xs font-semibold leading-5 text-amber-200">
                Email delivery is in test mode.
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-100/80">
                Reports can only be sent to the verified Resend account email
                until a sending domain is verified.
              </p>

              <p className="mt-2 text-xs leading-5 text-amber-100/60">
                This does not affect report generation. The report is still
                available inside FinSentry.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Not sent yet.
            </p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={isSending || emailSent}
            className={`w-full rounded-xl px-5 py-3 text-xs font-semibold transition disabled:cursor-not-allowed sm:w-auto ${
              emailSent
                ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
            }`}
          >
            {isSending
              ? "Sending Email..."
              : emailSent
              ? "Sent to Inbox ✓"
              : "Send to Email ✉"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailReportCard;