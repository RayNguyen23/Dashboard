"use client";
import { useState } from "react";
import { LockIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  const [Username, setUsername] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [FailedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const [IsBlocked, setIsBlocked] = useState(false); // Track block status

  const handleLogin = () => {
    if (IsBlocked) {
      alert("Too many failed attempts. Please try again later.");
      return;
    }

    if (Username === "tunt89172@admin" && Password === "Admin89172#") {
      setFailedAttempts(0);
      alert("Login successful!");
      Cookies.set("IsLogin", "true", { expires: 7, path: "/" });
      router.push("/dashboard");
    } else {
      setFailedAttempts((prev) => prev + 1); // Increment failed attempts
      alert("Invalid credentials!");

      if (FailedAttempts + 1 >= 3) {
        // Block client after 3 failed attempts
        setIsBlocked(true);
        setTimeout(() => setIsBlocked(false), 30000); // Unblock after 30 seconds
        alert("Too many failed attempts. You are temporarily blocked.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center mb-4">
            <LockIcon className="h-12 w-12 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Welcome Back
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
