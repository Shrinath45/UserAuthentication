import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Check if user is logged in (on page refresh)
  useEffect(() => {
    if (cookies.token) {
      axios
        .get("http://127.0.0.1:5000/get-user", {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [cookies.token]);

  // Login Function
  const login = (token, userData) => {
    setCookie("token", token, { path: "/", maxAge: 3600 }); // Store token for 1 hour
    setUser(userData);
    navigate("/dashboard"); // Redirect to dashboard
  };

  // Logout Function
  const logout = () => {
    removeCookie("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
