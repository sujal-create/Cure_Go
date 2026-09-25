import Link from "next/link";

const categories = [
  {
    title: "Prescription Medicines",
    desc: "Doctor approved medicines",
    icon: "💊",
    href: "/prescription",
  },
  {
    title: "OTC Medicines",
    desc: "No prescription required",
    icon: "🩺",
    href: "/non-prescription",
  },
  {
    title: "General Products",
    desc: "Daily healthcare essentials",
    icon: "🛒",
    href: "/general-products",
  },
];

const healthCategories = [
  "Pain Relief",
  "Diabetes",
  "Heart Care",
  "Skin Care",
  "Baby Care",
  "Vitamins",
  "Cold & Flu",
  "Digestive Care",
];

export default function MedicinesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="text-center mb-14">

          <h1 className="text-4xl md:text-5xl font-bold">
            Medicines Delivered
            <span className="text-blue-500"> Fast</span>
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Order prescription medicines, OTC products and
            healthcare essentials with quick delivery.
          </p>

          <div className="mt-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none"
            />
          </div>

        </div>

        {/* Main Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition"
            >
              <div className="text-5xl mb-4">
                {item.icon}
              </div>

              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="text-slate-400 mt-2">
                {item.desc}
              </p>
            </Link>
          ))}

        </div>

        {/* Health Categories */}
        <section className="mb-16">

          <h2 className="text-3xl font-bold mb-8">
            Shop By Health Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {healthCategories.map((category) => (
              <div
                key={category}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center hover:border-blue-500 cursor-pointer transition"
              >
                {category}
              </div>
            ))}

          </div>

        </section>

        {/* Benefits */}
        <section>

          <h2 className="text-3xl font-bold mb-8">
            Why Cure_Go?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-semibold text-lg">
                Genuine Medicines
              </h3>
              <p className="text-slate-400 mt-2">
                100% authentic products from trusted suppliers.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg">
                Fast Delivery
              </h3>
              <p className="text-slate-400 mt-2">
                Medicines delivered quickly to your doorstep.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-4xl mb-3">🛟</div>
              <h3 className="font-semibold text-lg">
                24/7 Support
              </h3>
              <p className="text-slate-400 mt-2">
                Always available to help with your orders.
              </p>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}