"use client";

import React from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const [adding, setAdding] = React.useState(false);

  const handleAdd = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("curego_user") || "null"
      );

      const key =
        user?.id
          ? `curego_cart_${user.id}`
          : "curego_cart_guest";

      const raw = localStorage.getItem(key);
      const cart = raw ? JSON.parse(raw) : [];

      const index = cart.findIndex(
        (item: any) => item.id === product.id
      );

      if (index >= 0) {
        cart[index].quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(key, JSON.stringify(cart));

      window.dispatchEvent(
        new CustomEvent("curego_cart_updated", {
          detail: {
            count: cart.reduce(
              (sum: number, item: any) =>
                sum + item.quantity,
              0
            ),
          },
        })
      );

      setAdding(true);

      setTimeout(() => {
        setAdding(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = () => {
    const category =
      (product.category || "").toLowerCase();

    if (category === "prescription") {
      return "/prescription.png";
    }

    if (category === "non-prescription") {
      return "/non-prescription.png";
    }

    return "/genral_products.png";
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}

      <div className="relative h-56 bg-gray-50 flex items-center justify-center p-5">

        <img
          src={getImage()}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          Available
        </span>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 h-10 overflow-hidden">
          {product.description ||
            "Quality healthcare product."}
        </p>

        <div className="flex items-center justify-between mt-5">

          <div>
            <p className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </p>
          </div>

          <span className="text-sm text-green-500">
            In Stock
          </span>

        </div>

        <button
          onClick={handleAdd}
          disabled={adding}
          className={`w-full mt-4 py-3 rounded-xl font-medium text-white transition-all ${
            adding
              ? "bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {adding
            ? "✓ Added to Cart"
            : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}