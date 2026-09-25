"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function PrescriptionPage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/medicines?category=prescription"
    )
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setProducts(allProducts);
      setLimit(12);
      return;
    }

    const filtered = allProducts.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(term.toLowerCase())
    );

    setProducts(filtered);
    setLimit(12);
  };

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">
        Prescription Medicines
      </h1>

      <SearchBar onSearch={handleSearch} />

      <p className="mb-4 text-sm text-gray-500">
        Products Found: {products.length}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, limit).map((p) => (
          <ProductCard
            key={p._id}
            product={{
              id: p._id,
              title: p.name,
              price: p.price,
              description: p.description,
              img: p.image || p.img,
              category: p.category,
              prescriptionRequired: true,
            }}
          />
        ))}
      </div>

      {products.length > limit && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setLimit((prev) => prev + 12)}
            className="btn-primary"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}