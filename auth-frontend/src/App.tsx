import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import DashboardPage from "./pages/DashboardPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div
          style={{
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            margin: 0,
            padding: 0,
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>

      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          min-height: 100vh;
        }
        
        #root {
          min-height: 100vh;
        }
        
        /* Smooth transitions for all interactive elements */
        button, input, select, textarea, a {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Focus styles for accessibility */
        button:focus, input:focus, select:focus, textarea:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.7);
        }
        
        /* Selection styles */
        ::selection {
          background: rgba(102, 126, 234, 0.3);
          color: #2d3748;
        }
        
        /* Animation keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        /* Loading animation */
        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
        
        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
        }
        
        /* Responsive utilities */
        @media (max-width: 768px) {
          .mobile-hidden {
            display: none !important;
          }
          
          .mobile-full {
            width: 100% !important;
            max-width: none !important;
          }
        }
        
        @media (max-width: 480px) {
          body {
            font-size: 14px;
          }
        }
      `}</style>
    </AuthProvider>
  );
};

export default App;
