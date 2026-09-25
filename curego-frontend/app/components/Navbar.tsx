"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Menu,
  User,
  Home,
  Pill,
  Ambulance,
  Info,
  CalendarDays,
} from "lucide-react";
import { useEffect, useState } from "react";

const QUICKMEDS_URL =
  process.env.NEXT_PUBLIC_QUICKMEDS_URL ||
  "https://quick-meds-copy-r1q7.vercel.app";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [cartCount, setCartCount] = useState(0);
const [user, setUser] = useState<any>(null);
const [accountMenu, setAccountMenu] = useState(false);
useEffect(() => {
  const checkAuth = () => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);

  const storedUser =
    localStorage.getItem("curego_user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
};

  checkAuth();
  loadCartCount();

  const handleCartUpdate = () => {
    loadCartCount();
  };

  window.addEventListener("storage", checkAuth);
  window.addEventListener("curego_auth_updated", checkAuth);
  window.addEventListener(
    "curego_cart_updated",
    handleCartUpdate as EventListener
  );

  return () => {
    window.removeEventListener("storage", checkAuth);
    window.removeEventListener(
      "curego_auth_updated",
      checkAuth
    );
    window.removeEventListener(
      "curego_cart_updated",
      handleCartUpdate as EventListener
    );
  };
}, []);

  const handleBookAppointment = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Send CureGo JWT to QuickMeds SSO page
    window.location.href =
      `${QUICKMEDS_URL}/sso?token=${encodeURIComponent(token)}`;
  };
  const loadCartCount = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("curego_user") || "null"
    );

    const key = user?.id
      ? `curego_cart_${user.id}`
      : "curego_cart_guest";

    const cart = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    const count = cart.reduce(
      (sum: number, item: any) =>
        sum + (item.quantity || 1),
      0
    );

    setCartCount(count);
  } catch (error) {
    console.error(error);
    setCartCount(0);
  }
};

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Cure Go"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/medicines"
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
          >
            <Pill size={18} />
            Medicines
          </Link>

          <Link
            href="/ambulance"
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
          >
            <Ambulance size={18} />
            Ambulance
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
          >
            <Info size={18} />
            About
          </Link>
          <Link
  href="/orders"
   className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
>
  My Orders
</Link>

          {/* Book Appointment */}
       

        </nav>
<Link
  href="/cart"

   className="relative left-10 p-3 rounded-xl bg-white border border-slate-800 hover:border-blue-500 transition  md:hidden"
>
  🛒
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</Link>
        {/* Right */}
        <div className="hidden lg:flex items-center gap-4">

        <Link
  href="/cart"
  className="relative p-3 rounded-xl bg-white border border-slate-800 hover:border-blue-500 transition"
>
  <ShoppingCart
    size={20}
    className="text-slate-900"
  />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-blue-600 text-black text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>


          {isLoggedIn ? (
  <>
    <button
      onClick={handleBookAppointment}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
    >
      <CalendarDays size={18} />
      Book Appointment
    </button>

   <div className="relative">
  <button
    onClick={() =>
      setAccountMenu(!accountMenu)
    }
    className="px-5 py-3 rounded-xl border border-slate-700 text-white"
  >
    {user?.name || "Account"} ▼
  </button>

  {accountMenu && (
    <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">

      <div className="px-4 py-3 border-b border-slate-700">
        <p className="font-semibold text-white">
          {user?.name}
        </p>
      </div>

      <Link
        href="/orders"
        className="block px-4 py-3 hover:bg-slate-800"
      >
        📦 My Orders
      </Link>

      <Link
        href="/account"
        className="block px-4 py-3 hover:bg-slate-800"
      >
        ⚙️ Manage Account
      </Link>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("curego_user");

          window.dispatchEvent(
            new CustomEvent(
              "curego_auth_updated"
            )
          );

          window.location.reload();
        }}
        className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-800"
      >
        🚪 Logout
      </button>

    </div>
  )}
</div>
  </>
) : (
  <>
    <Link
      href="/login"
      className="px-5 py-3 rounded-xl border text-amber-100 border-slate-700"
    >
      Login
    </Link>

    <Link
      href="/signup"
      className="px-5 py-3 rounded-xl bg-blue-600"
    >
      Sign Up
    </Link>
  </>
)}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950">
          <div className="flex flex-col p-4 gap-4">

            <Link href="/" onClick={() => setMobileMenu(false)}>
              Home
            </Link>

            <Link href="/medicines" onClick={() => setMobileMenu(false)}>
              Medicines
            </Link>

            <Link href="/ambulance" onClick={() => setMobileMenu(false)}>
              Ambulance
            </Link>

            <Link href="/about" onClick={() => setMobileMenu(false)}>
              About
            </Link>

            <Link href="/cart" onClick={() => setMobileMenu(false)}>
              Cart
            </Link>

            <button
              onClick={() => {
                setMobileMenu(false);
                handleBookAppointment();
              }}
              className="text-left flex items-center gap-2"
            >
              <CalendarDays size={18} />
              Book Appointment
            </button>

          </div>
        </div>
      )}
    </header>
  );
}