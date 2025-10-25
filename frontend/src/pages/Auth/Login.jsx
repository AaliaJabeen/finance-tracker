import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
  className="relative w-screen h-screen flex items-center justify-center"
  style={{
    backgroundImage: `url("/assets/finance-bg2.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login form */}
      <div className="relative bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Welcome Back 👋</h2>
        <p className="text-center text-gray-600 mb-6">
          Login to continue your journey with{" "}
          <span className="text-indigo-600 font-semibold">Finance Tracker</span>
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4" autoComplete="off">
          <div>
            <label htmlFor="email" className="text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="new-email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
