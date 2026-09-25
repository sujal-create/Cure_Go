import Link from "next/link";

const categories = [
  {
    name: "Prescription",
    image: "/prescription.png",
    link: "/prescription",
  },
  {
    name: "OTC Medicines",
    image: "/non-prescription.png",
    link: "/non-prescription",
  },
  {
    name: "General Products",
    image: "/genral_products.png",
    link: "/general-products",
  },
  {
    name: "Ambulance",
    image: "/icons/ambulance.svg",
    link: "/ambulance",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-blue-500 transition"
          >
            <img
              src={item.image}
              className="h-16 mx-auto mb-4"
            />
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}