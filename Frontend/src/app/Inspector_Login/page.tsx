"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "..";

const InspectorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInspectorSignup = () => {
    router.push("/Inspector_Signup");
  };

  const handleCustomerLogin = () => {
    router.push("/Customer_Login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/inspectors/inspector-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      router.push("/Inspector-Portal");
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
            Inspector Login
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              onClick={handleInspectorSignup}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              New Inspector? Sign Up
            </p>
            <p
              onClick={handleCustomerLogin}
              className="text-gray-600 cursor-pointer hover:underline mt-2"
            >
              Login as Customer
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectorLogin;
