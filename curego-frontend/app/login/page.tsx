"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        localStorage.setItem("token", json.token);

        try {
          const prevUser = JSON.parse(
            localStorage.getItem("curego_user") || "null"
          );

          const nextUser = json.user;

          localStorage.setItem(
            "curego_user",
            JSON.stringify(nextUser)
          );

          if (!prevUser || prevUser.id !== nextUser.id) {
            const userCartKey = `curego_cart_${nextUser.id}`;

            localStorage.setItem(
              userCartKey,
              JSON.stringify([])
            );

            window.dispatchEvent(
              new CustomEvent("curego_cart_updated", {
                detail: { count: 0 },
              })
            );
          }
        } catch (err) {
          console.warn("User storage error:", err);
        }

        window.dispatchEvent(
          new CustomEvent("curego_auth_updated")
        );

        router.push("/");
      } else {
        setError(json.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

      {/* Logo */}
      <div className="flex flex-col items-center mb-8">

        <img
          src="/logo.png"
          alt="Cure Go"
          className="h-24 w-auto object-contain mb-4"
        />

        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-slate-400 mt-2 text-center">
          Login to your CureGo account and continue
          ordering medicines.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-center text-slate-400 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create Account
          </a>
        </p>

      </form>

    </div>

  </div>
);
}