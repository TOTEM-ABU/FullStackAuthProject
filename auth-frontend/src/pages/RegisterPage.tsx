import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    yearOfBirth: "",
    role: "USER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const registerData = {
        ...formData,
        yearOfBirth: new Date(formData.yearOfBirth),
        role: formData.role,
      };

      await register(registerData);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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
          maxWidth: "600px",
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
              background: "linear-gradient(135deg, #27ae60, #2ecc71)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(39, 174, 96, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              👤
            </span>
          </div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#2d3748",
              margin: "0 0 10px",
              background: "linear-gradient(135deg, #27ae60, #2ecc71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              color: "#718096",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Join us and start your journey today
          </p>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                First Name
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                  }}
                  placeholder="First name"
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Last Name
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                  }}
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a5568",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Email Address
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  background: "transparent",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#2d3748",
                }}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Password
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={4}
                  maxLength={8}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                  }}
                  placeholder="4-8 characters"
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Phone Number
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
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                  }}
                  placeholder="+998XXXXXXXXX"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Date of Birth
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
                  type="date"
                  name="yearOfBirth"
                  value={formData.yearOfBirth}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4a5568",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Role
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
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    background: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#2d3748",
                    cursor: "pointer",
                  }}
                >
                  <option value="USER">User</option>
                </select>
              </div>
            </div>
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
                : "linear-gradient(135deg, #27ae60, #2ecc71)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading ? "none" : "0 8px 25px rgba(39, 174, 96, 0.3)",
              transform: loading ? "scale(0.98)" : "scale(1)",
              position: "relative",
              overflow: "hidden",
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
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            padding: "24px",
            background: "rgba(39, 174, 96, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(39, 174, 96, 0.1)",
          }}
        >
          <p
            style={{
              color: "#718096",
              margin: "0 0 16px",
              fontSize: "14px",
            }}
          >
            Already have an account?
          </p>
          <Link
            to="/login"
            style={{
              color: "#27ae60",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "16px",
              padding: "12px 24px",
              borderRadius: "8px",
              background: "rgba(39, 174, 96, 0.1)",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
          >
            Sign In
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

export default RegisterPage;
