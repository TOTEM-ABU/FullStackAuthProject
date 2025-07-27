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

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
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

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // TODO: Verify token with backend and get user data
      setIsAuthenticated(true);
      // For now, we'll just set a basic user object
      setUser({
        id: "1",
        email: "user@example.com",
        firstName: "User",
        lastName: "Example",
        role: "USER",
      });
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await authApi.login(data);
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      // TODO: Get user data from token or make API call
      setUser({
        id: "1",
        email: data.email,
        firstName: "User",
        lastName: "Example",
        role: "USER",
      });
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
    login,
    register,
    verifyOtp,
    resendOtp,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
