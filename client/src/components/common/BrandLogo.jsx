/**
 * BrandLogo — reusable FinSentry brand mark.
 *
 * Props:
 *   size     — pixel size of the mark square (default 40)
 *   showText — show "FinSentry" wordmark beside the mark (default true)
 *   subtitle — show subtitle line below wordmark (default "Ledger Intelligence")
 *   variant  — "dark" (for sidebar/dark bg) | "light" (for landing/auth pages)
 */
function BrandLogo({
  size = 40,
  showText = true,
  subtitle = "Ledger Intelligence",
  variant = "dark",
}) {
  const isDark = variant === "dark";

  /* Mark colours */
  const markBg      = isDark ? "#FFFFFF" : "#0A0A0A";
  const markText    = isDark ? "#050912" : "#F5F2EB";
  const markBorder  = isDark ? "rgba(52,211,153,0.30)" : "rgba(10,10,10,0.80)";
  const markShadow  = isDark ? "0 0 24px rgba(52,211,153,0.18)" : "none";

  /* Text colours */
  const wordmarkColor  = isDark ? "#FFFFFF" : "#0A0A0A";
  const subtitleColor  = isDark ? "#64748b" : "#8B8173";

  const fontSize = Math.round(size * 0.32);
  const radius   = Math.round(size * 0.22);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", lineHeight: 1 }}>
      {/* Mark */}
      <span
        style={{
          display:       "inline-flex",
          alignItems:    "center",
          justifyContent:"center",
          width:         size,
          height:        size,
          borderRadius:  radius,
          background:    markBg,
          border:        `1.5px solid ${markBorder}`,
          boxShadow:     markShadow,
          flexShrink:    0,
        }}
        aria-hidden="true"
      >
        {/* Inline SVG FS monogram */}
        <svg
          width={size * 0.54}
          height={size * 0.54}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* F stroke */}
          <path
            d="M3 3h8M3 3v14M3 10h6"
            stroke={markText}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* S stroke */}
          <path
            d="M12 5.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S15.88 8 14.5 8 12 9.12 12 10.5s1.12 2.5 2.5 2.5S17 14.62 17 16"
            stroke={isDark ? "#34d399" : markText}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Wordmark */}
      {showText && (
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              fontFamily:    "'Space Mono', monospace",
              fontSize:      fontSize,
              fontWeight:    700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         wordmarkColor,
              lineHeight:    1.1,
            }}
          >
            FinSentry
          </span>

          {subtitle && (
            <span
              style={{
                fontFamily:    "'Space Mono', monospace",
                fontSize:      Math.round(fontSize * 0.72),
                fontWeight:    400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         subtitleColor,
                lineHeight:    1,
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default BrandLogo;
