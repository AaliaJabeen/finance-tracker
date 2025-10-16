// src/pages/Auth/Register.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
        Create Account 🚀
      </h2>
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 transition duration-200 font-semibold"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
