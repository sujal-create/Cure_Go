import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm">
              Trusted by 10,000+ Customers
            </div>

            <h1 className="mt-6 font-bold leading-tight text-4xl md:text-5xl lg:text-6xl">
              Fast. Trusted.
              <br />
              Medicine Delivered
              <br />
              <span className="text-blue-500">
                To Your Door.
              </span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg max-w-xl">
              Order prescription medicines, OTC products,
              healthcare essentials and emergency services
              with lightning-fast delivery.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/medicines"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium"
              >
                Shop Medicines
              </Link>

              <Link
                href="/help"
                className="border border-slate-700 hover:border-blue-500 px-6 py-3 rounded-xl"
              >
                How it Works
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Search medicine or symptom"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none"
              />

              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl">
                Search
              </button>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <img
              src="/hero-delivery.png"
              alt="Medicine Delivery"
              className="w-full max-w-2xl mx-auto"
            />

            <div className="absolute top-10 left-0 bg-slate-900/90 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-green-400">
                ✓ Genuine Products
              </h3>
              <p className="text-sm text-slate-400">
                Verified medicines
              </p>
            </div>

            <div className="absolute bottom-10 right-0 bg-slate-900/90 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-blue-400">
                ⚡ Quick Delivery
              </h3>
              <p className="text-sm text-slate-400">
                30 minute delivery
              </p>
            </div>

          </div>

        </div>

        {/* TRUST BAR */}

        <div className="grid md:grid-cols-3 gap-4 mt-12">

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-semibold">
              100% Genuine
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Authentic medicines.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-semibold">
              Secure Checkout
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Safe & encrypted.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-semibold">
              Quick Delivery
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              On-time delivery.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}