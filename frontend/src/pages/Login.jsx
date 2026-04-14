import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper font-body">
      <div className="bg-card p-8 rounded-2xl shadow-sm w-96 border border-section">

        <h1 className="font-heading text-4xl text-ink-dark text-center mb-1">Quill Quest</h1>
        <p className="text-ink-secondary text-center text-sm mb-8">Your literary adventure awaits</p>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-section bg-paper text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-rose"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full mb-6 px-4 py-2 rounded-lg border border-section bg-paper text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-rose"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-rose hover:bg-rose-light hover:text-ink text-white font-bold py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-ink-secondary text-sm mt-4">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="text-rose font-bold cursor-pointer hover:text-brown">
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}