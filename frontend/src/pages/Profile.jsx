import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>Welcome, {user?.email || "User"} 👋</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 px-4 py-2 rounded-lg text-white"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
