import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const login = (username, password) => {
    // Static user credentials for demo purposes
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user", password: "user123", role: "user" },
    ];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setAuth({ isAuthenticated: true, user });
    } else {
      alert("Invalid username or password.");
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
