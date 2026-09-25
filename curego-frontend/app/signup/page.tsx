"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
     const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, mobile }),
      });
      const json = await res.json();
      if (res.ok) {
        localStorage.setItem('token', json.token);
        // store user and reset per-user cart if needed
        try { const prev = JSON.parse(localStorage.getItem('curego_user') || 'null'); const nextUser = json.user; localStorage.setItem('curego_user', JSON.stringify(nextUser));
          if (!prev || prev.id !== nextUser.id) { const userCartKey = `curego_cart_${nextUser.id}`; localStorage.setItem(userCartKey, JSON.stringify([])); window.dispatchEvent(new CustomEvent('curego_cart_updated', { detail: { count: 0 } })); }
        } catch (e) { console.warn('storing user failed', e); }
        // notify navbar (and other tabs) the auth state changed
        window.dispatchEvent(new CustomEvent('curego_auth_updated'));
        router.push('/');
      } else {
        setError(json.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
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
  className="h-20 w-auto object-contain mb-4"
/>

        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="text-slate-400 mt-2 text-center">
          Join CureGo and get medicines delivered
          to your doorstep.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        {/* Name */}
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Full Name"
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Email */}
        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          type="email"
          placeholder="Email Address"
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Mobile */}
        <input
          value={mobile}
          onChange={(e) =>
            setMobile(
              e.target.value.replace(/\D/g, "")
            )
          }
          maxLength={10}
          minLength={10}
          type="tel"
          placeholder="Mobile Number"
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Password */}
        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          type="password"
          placeholder="Password"
          required
          className="w-full bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 px-4 py-3 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
        />

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Create Account
        </button>

        {/* Login Link */}
        <p className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Login
          </a>
        </p>

      </form>

    </div>

  </div>
);
}
