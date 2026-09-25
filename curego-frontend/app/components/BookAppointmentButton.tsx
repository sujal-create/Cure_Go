"use client";

import { useRouter } from "next/navigation";

export default function BookAppointmentButton() {
  const router = useRouter();

  const handleBookAppointment = () => {
    // Get CureGo JWT
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      alert("Please login first to book an appointment.");
      router.push("/login");
      return;
    }

    // QuickMeds URL
    const quickMedsUrl =
      `http://localhost:5173/sso?token=${encodeURIComponent(
        token
      )}`;

    // Redirect to QuickMeds
    window.location.href = quickMedsUrl;
  };

  return (
    <button
      onClick={handleBookAppointment}
      className="btn-primary"
    >
      Book Appointment
    </button>
  );
}