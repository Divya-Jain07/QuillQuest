import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      
      // Redirect to login after successful signup
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper font-body">
      <div className="bg-card p-8 rounded-2xl shadow-lg w-96 border border-section">

        <h1 className="font-heading text-4xl text-ink-dark text-center mb-1">
          Quill Quest
        </h1>
        <p className="text-ink-secondary text-center text-sm mb-8">
          Join the community of readers
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-section bg-paper text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-brown"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full mb-4 px-4 py-2 rounded-lg border border-section bg-paper text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-brown"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full mb-6 px-4 py-2 rounded-lg border border-section bg-paper text-ink placeholder-ink-secondary focus:outline-none focus:ring-2 focus:ring-brown"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-brown hover:bg-mustard text-paper font-bold py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-ink-secondary text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-brown-deep font-bold cursor-pointer hover:text-mustard"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}