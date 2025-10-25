import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Track input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate email
    if (users.find((u) => u.email === form.email)) {
      alert("User already exists with this email!");
      return;
    }

    // Save new user
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login
    navigate("/login");
  };

  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("/finance-tracker/assets/finance-bg3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Card container */}
      <div className="relative bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Create Account 🚀
        </h2>

        {/* Register form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
          autoComplete="off"
        >
          <div>
            <label htmlFor="name" className="text-gray-700 block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="new-name"
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-700 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="new-email"
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg"
          >
            Register
          </button>
        </form>

        {/* Footer link */}
        <p className="text-gray-700 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
          <div className="text-xs">
              Note: After registration you'll be redirected to the login page, please login with the same email and password to see your Dashboard
          </div>
          
        </p>
      </div>
    </div>
  );
}

export default Register;
