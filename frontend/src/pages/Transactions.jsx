import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Transactions() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const key = `transactions_${user.email}`;
  const transactions = JSON.parse(localStorage.getItem(key)) || [];

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Transactions 📜</h1>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between"
            >
              <span>
                {t.note || t.type} ({t.date})
              </span>
              <span
                className={t.type === "income" ? "text-green-400" : "text-red-400"}
              >
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex gap-4">
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Go to the dashboard
        </Link>
      </div>
      
      
    </div>
  );
}

export default Transactions;
