"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../index";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid credentials");
    } else {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/Request-Inspection");
    }
  };

  return (
    <>
      <Header />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('Images/main.jpg')" }} // Background image
      >
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Customer Login
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p
              onClick={() => router.push("/Customer_Signup")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              New User? Sign Up
            </p>
            <p
              onClick={() => router.push("/Inspector_Login")}
              className="text-gray-600 cursor-pointer hover:underline mt-2"
            >
              Login as Inspector
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
