"use client";

import { useEffect, useState } from "react";

interface Booking {
  bookingId: string;
  etaMinutes: number;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
}

export default function AmbulanceSection() {
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [booking, setBooking] =
    useState<Booking | null>(null);
  const [eta, setEta] =
    useState<number | null>(null);

  useEffect(() => {
    if (eta === null || eta <= 0) return;

    const timer = setInterval(() => {
      setEta((prev) =>
        prev ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [eta]);

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setStatus("Booking Ambulance...");

    try {
      const res = await fetch(
        "http://localhost:5000/api/ambulance",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            location,
            medicalCondition:
              condition,
          }),
        }
      );

      const json = await res.json();

      if (res.ok && json.success) {
        const bookingData = {
          bookingId:
            json.booking.bookingId ||
            "CG-AMB-1024",
          etaMinutes:
            json.booking.etaMinutes ||
            15,
          driverName:
            json.booking.driverName ||
            "Rajesh Sharma",
          driverPhone:
            json.booking.driverPhone ||
            "9876543210",
          vehicleNumber:
            json.booking
              .vehicleNumber ||
            "MP09AB1234",
        };

        setBooking(bookingData);
        setEta(
          bookingData.etaMinutes * 60
        );

        setStatus(
          "Ambulance Assigned Successfully"
        );
      } else {
        setStatus(
          json.message ||
            "Booking Failed"
        );
      }
    } catch (error) {
      console.error(error);

      setStatus(
        "Server Error. Please Try Again."
      );
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src="/ambulance.png"
          alt="Ambulance"
          className="w-64"
        />

        <div>
          <h2 className="text-3xl font-bold text-red-600">
            🚑 Emergency Ambulance
          </h2>

          <p className="text-gray-600 mt-2">
            Available 24×7 for
            emergency medical
            transport.
          </p>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4 "
      >
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
          required
          className="w-full border rounded-xl px-2 py-2 bg-blue-400"
        />

        <textarea
          placeholder="Medical Condition"
          value={condition}
          onChange={(e) =>
            setCondition(
              e.target.value
            )
          }
          rows={4}
          required
          className="w-full border rounded-xl px-4 py-3  bg-blue-400"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Book Ambulance
        </button>
      </form>

      {status && (
        <div className="mt-4 text-blue-600 font-medium">
          {status}
        </div>
      )}

      {booking && (
        <div className="mt-8 space-y-5">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-700">
              Booking Confirmed
            </h3>

            <p className="text-black">
              Booking ID:
              {" "}
              {booking.bookingId}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 text-black">
            <h3 className="font-semibold text-lg mb-3 text-black">
              Driver Details
            </h3>

            <p>
              👤 Driver:
              {" "}
              {booking.driverName}
            </p>

            <p>
              📞 Phone:
              {" "}
              {booking.driverPhone}
            </p>

            <p>
              🚑 Vehicle:
              {" "}
              {booking.vehicleNumber}
            </p>

            <a
              href={`tel:${booking.driverPhone}`}
              className="inline-block mt-4 bg-blue-600 text-black px-4 py-2 rounded-lg "
            >
              Call Driver
            </a>
          </div>

          {eta !== null && (
            <div className="bg-red-400  rounded-xl p-5 text-center">
              <h3 className="text-black font-bold">
                Ambulance Arriving In
              </h3>

              <div className="text-5xl font-bold mt-2">
                {Math.floor(
                  eta / 60
                )}
                :
                {(eta % 60)
                  .toString()
                  .padStart(
                    2,
                    "0"
                  )}
              </div>
            </div>
          )}

          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-4">
              Status Tracker
            </h3>

            <div className="space-y-2">
              <p className="text-green-600">
                ✓ Request Received
              </p>

              <p className="text-green-600">
                ✓ Ambulance Assigned
              </p>

              <p className="text-green-600">
                ✓ Driver On Route
              </p>

              <p className="text-gray-400">
                ○ Arriving
              </p>

              <p className="text-gray-400">
                ○ Reached
              </p>
            </div>
          </div>

          <a
            href="tel:108"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Emergency Call 108
          </a>
        </div>
      )}
    </section>
  );
}