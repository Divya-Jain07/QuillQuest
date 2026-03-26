import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}