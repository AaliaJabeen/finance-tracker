import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    allTransactions.push({
      ...transaction,
      email: user.email,
    });

    localStorage.setItem("transactions", JSON.stringify(allTransactions));
    navigate("/dashboard");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-900"
      style={{
        backgroundImage: `url("/assets/finance-bg3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          ➕ Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Food, Rent)"
            value={transaction.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <select
            name="type"
            value={transaction.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={transaction.amount}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
