"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { handleLogin, handleNumberClick, handleClear, handleBackspace } from "./funciones/funciones";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white relative">
        <form onSubmit={(e) => handleLogin(e, email, pin, router, setPin)} className="w-full max-w-sm">
          <h1 className="font-lato mb-3 text-black font-bold mt-12 text-2xl">Welcome</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-lato font-semibold  text-gray-700 mb-1">Username</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-lato font-semibold text-gray-700 mb-1">4-Pin Code</label>
            <input
              id="password"
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-200 text-center border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => handleNumberClick(pin, setPin, num.toString())}
                className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleBackspace(pin, setPin)}
              className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
            >
              ⌫
            </button>
            <button
              type="button"
              onClick={() => handleNumberClick(pin, setPin, '0')}
              className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleClear(setPin)}
              className="p-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full shadow text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between text-sm mb-6">
            <a href="/forgot-password" className="text-blue-600 hover:underline font-lato">
              Forgot my 4-Pin Code
            </a>
          </div>

          <button
            type="submit"
            className="w-full font-lato bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
            onClick={(e) => handleLogin(e, email, pin, router, setPin)} 
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-6 font-lato">
            Newbie? Need a new account.{' '}
            <a href="/register" className="text-blue-600 hover:underline font-lato">
              Register
            </a>
          </p>
        </form>

        <h1 className="absolute top-5 left-5 font-bold text-3xl font-space-mono text-black">
          {">"}WareSoftWare
        </h1>
      </div>

      {/* Right side */}
      <div className="hidden md:flex md:w-1/2 bg-gray-200 justify-center items-center relative">
        <Image 
          src="/login_warehouse2.png" 
          alt="Login Illustration" 
          layout="fill" 
          objectFit="cover" 
        />
      </div>
    </div>
  );
}
