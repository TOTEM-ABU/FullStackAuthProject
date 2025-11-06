import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/auth";

const UpdateUserPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    yearOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize form with current user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        yearOfBirth: user.yearOfBirth
          ? new Date(user.yearOfBirth).getFullYear().toString()
          : "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(formData.yearOfBirth);
    if (formData.yearOfBirth && (birthYear < 1900 || birthYear > currentYear)) {
      setError("Please enter a valid birth year");
      return;
    }

    setLoading(true);

    try {
      const updateData: any = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
      };

      if (formData.yearOfBirth) {
        updateData.yearOfBirth = new Date(parseInt(formData.yearOfBirth), 0, 1);
      }

      await authApi.updateUser(updateData);

      // Update the user context with new data
      if (setUser && user) {
        setUser({
          ...user,
          ...updateData,
        });
      }

      setSuccess("Profile updated successfully!");

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
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
            Please log in to access this page.
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          padding: "40px",
          width: "100%",
          maxWidth: "600px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
            }}
          >
            <span style={{ fontSize: "32px", color: "white" }}>👤</span>
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#2d3748",
              margin: "0 0 8px",
            }}
          >
            Update Profile
          </h1>
          <p
            style={{
              color: "#718096",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Update your personal information
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "rgba(231, 76, 60, 0.1)",
              border: "1px solid rgba(231, 76, 60, 0.3)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              color: "#e74c3c",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div
            style={{
              background: "rgba(39, 174, 96, 0.1)",
              border: "1px solid rgba(39, 174, 96, 0.3)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              color: "#27ae60",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div>
              <label
                htmlFor="firstName"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#2d3748",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#2d3748",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div>
              <label
                htmlFor="phoneNumber"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#2d3748",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="yearOfBirth"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#2d3748",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Year of Birth
              </label>
              <input
                type="number"
                id="yearOfBirth"
                name="yearOfBirth"
                value={formData.yearOfBirth}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                placeholder="Enter your birth year"
              />
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexDirection: "column",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.1)",
                color: "#667eea",
                border: "2px solid rgba(102, 126, 234, 0.3)",
                padding: "16px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
