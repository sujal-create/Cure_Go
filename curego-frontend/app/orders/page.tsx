"use client";

import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("curego_user") || "null"
      );

     const res = await fetch(
  `${API_URL}/api/orders/user/${user?.id}`
);

      const data = await res.json();

      setOrders(data.orders || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getRemainingTime = (createdAt: string) => {
    const deliveryTime =
      new Date(createdAt).getTime() +
      11 * 60 * 1000;

    const now = Date.now();

    const diff = deliveryTime - now;

    if (diff <= 0) {
      return "Delivered";
    }

    const mins = Math.floor(
      diff / (1000 * 60)
    );

    const secs = Math.floor(
      (diff % (1000 * 60)) / 1000
    );

    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-5 shadow"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">
                  Order #{order._id.slice(-6)}
                </h2>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {order.paymentStatus}
                </span>
              </div>

              <div className="mt-3">
                Amount :
                <b> ₹{order.totalAmount}</b>
              </div>

              <div className="mt-2">
                Status :
                <b> {order.orderStatus}</b>
              </div>

              <div className="mt-2">
                Rider :
                <b>
                  {" "}
                  {order.riderId?.name ||
                    "Assigning..."}
                </b>
              </div>

              <div className="mt-2">
                Phone :
                <b>
                  {" "}
                  {order.riderId?.phone ||
                    "--"}
                </b>
              </div>

              <div className="mt-4 p-3 bg-blue-400 rounded-lg">
                🚴 Delivery in :
                <span className="font-bold text-blue-700 ml-2">
                  {getRemainingTime(
                    order.createdAt
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}