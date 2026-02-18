import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Inactivity timeout: 10 minutes
const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("last_activity");
    
    // Clear inactivity timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  // Logout due to inactivity
  const logoutDueToInactivity = useCallback(() => {
    // Store reason for the login page to show a message
    sessionStorage.setItem("logout_reason", "inactivity");
    logout();
  }, [logout]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Update last activity timestamp
    localStorage.setItem("last_activity", Date.now().toString());

    // Set new timer
    inactivityTimerRef.current = setTimeout(() => {
      console.log("Session expired due to inactivity");
      logoutDueToInactivity();
    }, INACTIVITY_TIMEOUT);
  }, [logoutDueToInactivity]);

  // Clear session on app restart/refresh
  useEffect(() => {
    // Always clear session on app restart
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("last_activity");
    
    setIsLoading(false);
  }, []);

  // Track user activity to reset inactivity timer
  useEffect(() => {
    if (!user) return; // Only track if user is logged in

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners for user activity
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Start the initial timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [user, resetInactivityTimer]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Mock authentication - Replace with actual API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user credentials for demo
      const mockUsers = [
        { email: "admin@company.com", password: "admin123", user: { id: "U001", name: "Alice Johnson", email: "admin@company.com", role: "Admin" } },
        { email: "agent@company.com", password: "agent123", user: { id: "U002", name: "Bob Smith", email: "agent@company.com", role: "Agent" } },
        { email: "customer@company.com", password: "customer123", user: { id: "U004", name: "Dan Wilson", email: "customer@company.com", role: "Customer" } },
      ];

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Generate mock JWT token (in production, this comes from backend)
        const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
          userId: foundUser.user.id, 
          email: foundUser.user.email,
          role: foundUser.user.role,
          exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        }))}.mock-signature`;

        setToken(mockToken);
        setUser(foundUser.user);
        
        // Store in localStorage
        localStorage.setItem("auth_token", mockToken);
        localStorage.setItem("auth_user", JSON.stringify(foundUser.user));
        localStorage.setItem("last_activity", Date.now().toString());

        // Start inactivity timer
        resetInactivityTimer();

        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "An error occurred during login" };
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
