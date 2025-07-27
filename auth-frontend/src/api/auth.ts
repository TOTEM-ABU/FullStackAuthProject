const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Types based on backend DTOs
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  yearOfBirth: Date;
  role: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpData {
  email: string;
}

export interface RefreshTokenData {
  refresh_token: string;
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface ApiResponse {
  message: string;
}

// API functions
export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<any> => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  // Verify OTP
  verifyOtp: async (data: VerifyOtpData): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "OTP verification failed");
    }

    return response.json();
  },

  // Resend OTP
  resendOtp: async (data: ResendOtpData): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to resend OTP");
    }

    return response.json();
  },

  // Refresh token
  refreshToken: async (
    data: RefreshTokenData
  ): Promise<{ access_token: string }> => {
    const response = await fetch(`${API_URL}/users/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Token refresh failed");
    }

    return response.json();
  },

  // Update password (requires auth token)
  updatePassword: async (data: UpdatePasswordData): Promise<ApiResponse> => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/users/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Password update failed");
    }

    return response.json();
  },
};
