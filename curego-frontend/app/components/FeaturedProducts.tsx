import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 49,
    image: "/genral_products.png",
  },
  {
    id: 2,
    name: "Cough Syrup",
    price: 129,
    image: "/non-prescription.png",
  },
  {
    id: 3,
    name: "Multivitamin Tablets",
    price: 249,
    image: "/genral_products.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Featured For You
        </h2>

        <Link
          href="/medicines"
          className="text-blue-500 hover:text-blue-400"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            href="/medicines"
            key={product.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition"
          >
            <div className="bg-slate-800 rounded-xl h-52 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-contain"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              {product.name}
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              Best Seller • Fast Delivery
            </p>

            <div className="mt-4 text-blue-400 text-2xl font-bold">
              ₹{product.price}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}