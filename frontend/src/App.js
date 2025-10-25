import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Profile from "./pages/Profile";
import ThemeToggle from "./components/ThemeToggle";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
        {/* Theme Toggle in top-right */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <Routes>
          {/* Default page → Welcome */}
          <Route path="/" element={<Welcome />} />

          {/* Auth Pages */}
          <Route
            path="/login"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <Register />
              </div>
            }
          />

          {/* Main App Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
