import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Using stable Unsplash image links
const images = [
  "https://images.unsplash.com/photo-1521540216272-a50305cd4421?auto=format&fit=crop&w=1600&q=80", // finance
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80", // money
  "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1600&q=80", // business success
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80", // investment bank
  "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=1600&q=80", // savings growth
];

function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
          Welcome to <span className="text-indigo-400">Finance Tracker</span> 🚀
        </h1>
        <p className="text-lg mb-8 animate-slideUp">
          Your personal finance assistant to track income, expenses and savings 💰
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-full shadow-lg transition transform hover:scale-110 animate-bounce"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Welcome;
