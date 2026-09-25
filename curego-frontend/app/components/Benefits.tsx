export default function Benefits() {
  const benefits = [
    {
      title: "Fast Delivery",
      desc: "Get medicines delivered within minutes.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      desc: "Safe and encrypted payment gateway.",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      desc: "Customer support available anytime.",
      icon: "💬",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Why Choose Cure_Go
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500 transition"
          >
            <div className="text-5xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-slate-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}