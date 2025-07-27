import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await verifyOtp({ email, otp });
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await resendOtp({ email });
      setCountdown(60);
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            padding: "50px",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #e74c3c, #c0392b)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "32px", color: "white" }}>⚠️</span>
          </div>
          <h2 style={{ color: "#2d3748", marginBottom: "16px" }}>
            Email Required
          </h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>
            Please register first to verify your email.
          </p>
          <Link
            to="/register"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "8px",
              background: "rgba(102, 126, 234, 0.1)",
              display: "inline-block",
            }}
          >
            Go to Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "float 20s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          padding: "50px",
          width: "100%",
          maxWidth: "450px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #f39c12, #e67e22)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(243, 156, 18, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              🔐
            </span>
          </div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#2d3748",
              margin: "0 0 10px",
              background: "linear-gradient(135deg, #f39c12, #e67e22)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Verify Your Email
          </h2>
          <p
            style={{
              color: "#718096",
              fontSize: "16px",
              margin: "0 0 16px",
            }}
          >
            We've sent a verification code to
          </p>
          <div
            style={{
              background: "rgba(243, 156, 18, 0.1)",
              padding: "12px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(243, 156, 18, 0.2)",
              display: "inline-block",
              fontWeight: "600",
              color: "#d69e2e",
            }}
          >
            {email}
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "linear-gradient(135deg, #fed7d7, #feb2b2)",
              color: "#c53030",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "24px",
              textAlign: "center",
              border: "1px solid #fc8181",
              boxShadow: "0 4px 12px rgba(197, 48, 48, 0.1)",
            }}
          >
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              ⚠️ Error
            </div>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "32px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a5568",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Verification Code
            </label>
            <div
              style={{
                position: "relative",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f7fafc, #edf2f7)",
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "18px",
                  background: "transparent",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#2d3748",
                  textAlign: "center",
                  letterSpacing: "4px",
                  fontWeight: "600",
                }}
                placeholder="000000"
              />
            </div>
            <p
              style={{
                color: "#718096",
                fontSize: "14px",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              Enter the 6-digit code from your email
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "12px",
              background: loading
                ? "linear-gradient(135deg, #cbd5e0, #a0aec0)"
                : "linear-gradient(135deg, #f39c12, #e67e22)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading
                ? "none"
                : "0 8px 25px rgba(243, 156, 18, 0.3)",
              transform: loading ? "scale(0.98)" : "scale(1)",
              marginBottom: "24px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                />
                Verifying...
              </div>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            padding: "24px",
            background: "rgba(243, 156, 18, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(243, 156, 18, 0.1)",
          }}
        >
          <p
            style={{
              color: "#718096",
              margin: "0 0 16px",
              fontSize: "14px",
            }}
          >
            Didn't receive the code?
          </p>
          {countdown > 0 ? (
            <div
              style={{
                color: "#718096",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Resend available in {countdown}s
            </div>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              style={{
                color: "#f39c12",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                padding: "12px 24px",
                borderRadius: "8px",
                background: "rgba(243, 156, 18, 0.1)",
                border: "none",
                cursor: resendLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "inline-block",
              }}
            >
              {resendLoading ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid rgba(243, 156, 18, 0.3)",
                      borderTop: "2px solid #f39c12",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      marginRight: "8px",
                    }}
                  />
                  Sending...
                </div>
              ) : (
                "Resend Code"
              )}
            </button>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          <Link
            to="/login"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              padding: "8px 16px",
              borderRadius: "6px",
              background: "rgba(102, 126, 234, 0.1)",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VerifyOtpPage;
