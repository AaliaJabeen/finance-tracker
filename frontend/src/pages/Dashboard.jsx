import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const userTransactions = allTransactions.filter(
        (t) => t.email === user.email
      );
      setTransactions(userTransactions);
    }
  }, [navigate]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // Pie Chart Data
  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];
  const COLORS = ["#4ADE80", "#F87171"];

  const categoryData = transactions.reduce((acc, t) => {
  const category = t.category || "Other";
  let found = acc.find((c) => c.name === category);

  if (!found) {
    found = { name: category, income: 0, expense: 0 };
    acc.push(found);
  }

  if (t.type === "income") {
    found.income += Number(t.amount);
  } else if (t.type === "expense") {
    found.expense += Number(t.amount);
  }

  return acc;
}, []);


  return (
    <div
      className="relative min-h-screen bg-gray-900 text-white overflow-hidden"
      style={{
        backgroundImage: `url("/finance-tracker/assets/finance-bg3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-wide animate-fadeIn">
            🚀 Finance Dashboard
          </h1>
          <div>
            {currentUser && (
              <span className="mr-4 text-lg font-semibold animate-fadeIn">
                Hi, {currentUser.name || "User"} 👋
              </span>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/login");
              }}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg animate-slideUp">
            <h2 className="text-lg font-semibold">💰 Total Income</h2>
            <p className="text-3xl font-bold mt-2 text-green-300">
              ₹{totalIncome.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg animate-slideUp">
            <h2 className="text-lg font-semibold">💸 Total Expenses</h2>
            <p className="text-3xl font-bold mt-2 text-red-300">
              ₹{totalExpense.toFixed(2)}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg animate-slideUp">
            <h2 className="text-lg font-semibold">📊 Balance</h2>
            <p className="text-3xl font-bold mt-2 text-blue-300">
              ₹{balance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Pie Chart */}
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">💡 Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">📂 Category Breakdown</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" stackId="a" fill="#4ade80" /> {/* Green */}
                  <Bar dataKey="expense" stackId="a" fill="#f87171" /> {/* Red */}
                </BarChart>
              </ResponsiveContainer>
          </div>

        </div>

        {/* Transactions Table */}
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">📜 Recent Transactions</h2>
            <Link
              to="/add-transaction"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition transform hover:scale-105"
            >
              + Add Transaction
            </Link>
          </div>

          {transactions.length === 0 ? (
            <p className="text-gray-300">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-200 border-b border-gray-500">
                    <th className="py-2">Date</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((t, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-600 hover:bg-white/10 transition"
                    >
                      <td className="py-2">{t.date}</td>
                      <td className="py-2">{t.category}</td>
                      <td
                        className={`py-2 font-semibold ${
                          t.type === "income" ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {t.type}
                      </td>
                      <td className="py-2">₹{parseFloat(t.amount).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
