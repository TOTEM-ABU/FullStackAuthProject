import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
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
            Access Denied
          </h2>
          <p style={{ color: "#718096", marginBottom: "24px" }}>
            Please log in to access the dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "8px",
              background: "rgba(102, 126, 234, 0.1)",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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

      <header
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "20px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
              }}
            >
              <span
                style={{ fontSize: "24px", color: "white", fontWeight: "bold" }}
              >
                🚀
              </span>
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#2d3748",
                margin: 0,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #e74c3c, #c0392b)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(231, 76, 60, 0.3)",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main
        style={{
          padding: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "40px",
              marginBottom: "40px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #27ae60, #2ecc71)",
                  borderRadius: "50%",
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
                  👋
                </span>
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#2d3748",
                    margin: "0 0 8px",
                  }}
                >
                  Welcome back, {user.firstName}!
                </h2>
                <p
                  style={{
                    color: "#718096",
                    fontSize: "18px",
                    margin: 0,
                  }}
                >
                  You're successfully logged in to your account.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "white" }}>👤</span>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#2d3748",
                    margin: 0,
                  }}
                >
                  Personal Information
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span style={{ color: "#718096", fontWeight: "500" }}>
                    Full Name:
                  </span>
                  <span style={{ color: "#2d3748", fontWeight: "600" }}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span style={{ color: "#718096", fontWeight: "500" }}>
                    Email:
                  </span>
                  <span style={{ color: "#2d3748", fontWeight: "600" }}>
                    {user.email}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <span style={{ color: "#718096", fontWeight: "500" }}>
                    Phone:
                  </span>
                  <span style={{ color: "#2d3748", fontWeight: "600" }}>
                    {user.phoneNumber || "Not provided"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                  }}
                >
                  <span style={{ color: "#718096", fontWeight: "500" }}>
                    Role:
                  </span>
                  <span
                    style={{
                      color: "#27ae60",
                      fontWeight: "600",
                      background: "rgba(39, 174, 96, 0.1)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "white" }}>✅</span>
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#2d3748",
                    margin: 0,
                  }}
                >
                  Account Status
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    background: "rgba(39, 174, 96, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(39, 174, 96, 0.2)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>✅</span>
                  <div>
                    <div style={{ fontWeight: "600", color: "#27ae60" }}>
                      Email Verified
                    </div>
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Your email has been successfully verified
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    background: "rgba(102, 126, 234, 0.1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(102, 126, 234, 0.2)",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>🔐</span>
                  <div>
                    <div style={{ fontWeight: "600", color: "#667eea" }}>
                      Account Active
                    </div>
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Your account is active and secure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                margin: "0 0 24px",
              }}
            >
              Quick Actions
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <button
                onClick={() => navigate("/update-profile")}
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>📝</span>
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/update-password")}
                style={{
                  background: "linear-gradient(135deg, #27ae60, #2ecc71)",
                  color: "white",
                  border: "none",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>🔒</span>
                Change Password
              </button>

              <button
                style={{
                  background: "linear-gradient(135deg, #f39c12, #e67e22)",
                  color: "white",
                  border: "none",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(243, 156, 18, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚙️</span>
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
