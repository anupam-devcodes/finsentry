import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";
import BrandLogo from "../components/common/BrandLogo";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(formData);

      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle = {
    width:        "100%",
    border:       "1.5px solid #C8BFB0",
    borderRadius: "10px",
    background:   "#FAF8F4",
    padding:      "11px 14px",
    fontFamily:   "'Space Mono', monospace",
    fontSize:     "13px",
    color:        "#0A0A0A",
    outline:      "none",
    boxSizing:    "border-box",
  };

  const labelStyle = {
    display:       "block",
    fontFamily:    "'Space Mono', monospace",
    fontSize:      "10px",
    fontWeight:    700,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color:         "#3A3A3A",
    marginBottom:  "8px",
  };

  function onFocus(e) {
    e.target.style.borderColor = "#0A0A0A";
    e.target.style.background  = "#FFFFFF";
  }

  function onBlur(e) {
    e.target.style.borderColor = "#C8BFB0";
    e.target.style.background  = "#FAF8F4";
  }

  return (
    <main
      className="min-h-screen text-[#0A0A0A]"
      style={{ background: "#F6F1E8" }}
    >
      {/* Navbar */}
      <nav
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          borderBottom:   "1px solid #D9D0C0",
          padding:        "14px 24px",
          background:     "rgba(246,241,232,0.92)",
          backdropFilter: "blur(10px)",
          position:       "sticky",
          top:            0,
          zIndex:         50,
        }}
      >
        <Link to="/" style={{ display: "inline-flex", textDecoration: "none" }}>
          <BrandLogo size={36} showText variant="light" />
        </Link>

        <Link
          to="/login"
          style={{
            border:        "1px solid #0A0A0A",
            borderRadius:  "10px",
            padding:       "8px 16px",
            fontFamily:    "'Space Mono', monospace",
            fontSize:      "11px",
            fontWeight:    700,
            textTransform: "uppercase",
            letterSpacing: "0.10em",
            color:         "#0A0A0A",
            textDecoration:"none",
            background:    "transparent",
          }}
        >
          Log in
        </Link>
      </nav>

      {/* Two-column layout */}
      <section
        style={{ display: "grid", minHeight: "calc(100vh - 65px)" }}
        className="lg:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Left panel — editorial */}
        <div
          className="hidden lg:flex lg:flex-col lg:justify-between"
          style={{
            borderRight: "1px solid #D9D0C0",
            padding:     "48px 40px",
            background:  "#F0EBE0",
          }}
        >
          <div>
            <p
              style={{
                borderLeft:    "3px solid #1A7A3F",
                paddingLeft:   "12px",
                fontFamily:    "'Space Mono', monospace",
                fontSize:      "10px",
                textTransform: "uppercase",
                letterSpacing: "0.20em",
                color:         "#7A7A7A",
                marginBottom:  "24px",
              }}
            >
              Start your ledger
            </p>

            <h1
              style={{
                fontSize:      "clamp(2.2rem,3.5vw,3.4rem)",
                fontWeight:    900,
                lineHeight:    1.05,
                letterSpacing: "-0.03em",
                maxWidth:      "480px",
                color:         "#0A0A0A",
              }}
            >
              Build clarity from your first transaction.
            </h1>

            <p
              style={{
                marginTop:   "24px",
                maxWidth:    "380px",
                fontFamily:  "'Space Mono', monospace",
                fontSize:    "12px",
                lineHeight:  1.8,
                color:       "#3A3A3A",
              }}
            >
              Create your private workspace to track transactions, scan
              receipts, import CSV files, and generate monthly AI insights.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { step: "01", title: "Create account", desc: "Your private ledger workspace is created." },
              { step: "02", title: "Add money data", desc: "Manual, CSV, or receipt scan." },
              { step: "03", title: "Understand patterns", desc: "Charts and AI insights explain spending behavior." },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  border:       "1px solid #D9D0C0",
                  borderRadius: "12px",
                  padding:      "14px 16px",
                  background:   "#FFFCF7",
                  fontFamily:   "'Space Mono', monospace",
                  fontSize:     "11px",
                }}
              >
                <p style={{ fontWeight: 700, color: "#0A0A0A" }}>
                  {item.step} — {item.title}
                </p>
                <p style={{ marginTop: "4px", color: "#7A7A7A", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div
          style={{
            display:    "grid",
            placeItems: "center",
            padding:    "40px 24px",
          }}
        >
          <div
            style={{
              width:        "100%",
              maxWidth:     "400px",
              background:   "#FFFCF7",
              borderRadius: "20px",
              border:       "1px solid #D9D0C0",
              padding:      "36px 32px",
              boxShadow:    "0 20px 60px rgba(42,35,25,0.10)",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <p
                style={{
                  fontFamily:    "'Space Mono', monospace",
                  fontSize:      "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.20em",
                  color:         "#8B8173",
                  marginBottom:  "10px",
                }}
              >
                New workspace
              </p>
              <h2
                style={{
                  fontSize:      "1.8rem",
                  fontWeight:    800,
                  letterSpacing: "-0.025em",
                  lineHeight:    1.1,
                  color:         "#0A0A0A",
                }}
              >
                Register
              </h2>
              <p
                style={{
                  marginTop:   "10px",
                  fontFamily:  "'Space Mono', monospace",
                  fontSize:    "11px",
                  lineHeight:  1.7,
                  color:       "#5A5040",
                }}
              >
                Create your account and start organizing your personal finance
                ledger.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  id="register-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  required
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  id="register-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <input
                  id="register-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width:         "100%",
                  background:    isSubmitting ? "#555" : "#0A0A0A",
                  color:         "#F5F2EB",
                  borderRadius:  "10px",
                  border:        "none",
                  padding:       "13px 20px",
                  fontFamily:    "'Space Mono', monospace",
                  fontSize:      "12px",
                  fontWeight:    700,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  cursor:        isSubmitting ? "not-allowed" : "pointer",
                  opacity:       isSubmitting ? 0.7 : 1,
                  marginTop:     "4px",
                }}
              >
                {isSubmitting ? "Creating account..." : "Create account →"}
              </button>
            </form>

            <p
              style={{
                marginTop:   "20px",
                fontFamily:  "'Space Mono', monospace",
                fontSize:    "11px",
                color:       "#5A5040",
                textAlign:   "center",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ fontWeight: 700, color: "#0A0A0A", textDecoration: "underline" }}
              >
                Login instead
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;