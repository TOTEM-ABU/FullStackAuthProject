import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  authApi,
  type LoginData,
  type RegisterData,
  type ResendOtpData,
  type VerifyOtpData,
} from "../api/auth";

const getTokenFromCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  yearOfBirth?: Date;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyOtp: (data: VerifyOtpData) => Promise<void>;
  resendOtp: (data: ResendOtpData) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setUser({
        id: "1",
        email: "user@example.com",
        firstName: "User",
        lastName: "Example",
        phoneNumber: "1234567890",
        role: "USER",
      });
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await authApi.login(data);

      const accessToken = getTokenFromCookie("access_token");
      const refreshToken = getTokenFromCookie("refresh_token");

      if (!accessToken) {
        console.warn("Access token not found in cookies");
      }

      try {
        const userProfile = await authApi.getProfile();
        setUser({
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          phoneNumber: userProfile.phoneNumber,
          yearOfBirth: userProfile.yearOfBirth,
          role: userProfile.role,
        });
      } catch (profileError) {
        console.error("Failed to fetch profile:", profileError);
        setUser({
          id: "1",
          email: data.email,
          firstName: "User",
          lastName: "Example",
          phoneNumber: "1234567890",
          role: "USER",
        });
      }
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authApi.register(data);
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (data: VerifyOtpData) => {
    try {
      await authApi.verifyOtp(data);
    } catch (error) {
      throw error;
    }
  };

  const resendOtp = async (data: ResendOtpData) => {
    try {
      await authApi.resendOtp(data);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    document.cookie =
      "access_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie =
      "refresh_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuth = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const response = await authApi.refreshToken({
          refresh_token: refreshToken,
        });
        localStorage.setItem("access_token", response.access_token);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    setUser,
    login,
    register,
    verifyOtp,
    resendOtp,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
