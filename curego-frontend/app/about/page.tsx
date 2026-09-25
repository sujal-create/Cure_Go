export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Medicines Available" },
    { number: "24×7", label: "Customer Support" },
    { number: "15 Min", label: "Fast Delivery Goal" },
    { number: "100%", label: "Prescription Verification" },
  ];

  const features = [
    {
      icon: "🛡️",
      title: "Safety First",
      description:
        "Every prescription medicine is verified before processing.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description:
        "Quick and reliable medicine delivery to your doorstep.",
    },
    {
      icon: "❤️",
      title: "Patient Care",
      description:
        "Focused on making healthcare simple and accessible.",
    },
  ];

  const benefits = [
    "Genuine Medicines",
    "Prescription Verification",
    "Secure Payments",
    "Easy Returns",
    "24×7 Support",
    "Fast Delivery",
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Cure_Go
          </h1>

          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Making healthcare faster, safer, and more
            accessible through reliable medicine delivery,
            prescription support, and emergency assistance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="bg-white/20 px-4 py-2 rounded-full">
              💊 Medicine Delivery
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              📄 Prescription Support
            </span>

            <span className="bg-white/20 px-4 py-2 rounded-full">
              🚑 Emergency Assistance
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-blue-600">
                {item.number}
              </h3>

              <p className="text-gray-600 mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Our Mission
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            We aim to make essential healthcare accessible
            and convenient by combining trusted medicine
            delivery with modern technology and responsible
            clinical processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center"
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          How Cure_Go Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-semibold">
              Search Medicines
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="font-semibold">
              Upload Prescription
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-semibold">
              Verification
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-semibold">
              Fast Delivery
            </h3>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Cure_Go?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="border rounded-xl p-5 flex items-center gap-3"
              >
                <span className="text-green-600 text-xl">
                  ✓
                </span>

                <span className="font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white">
          <h2 className="text-4xl font-bold text-center mb-10">
            Contact Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">
                Email
              </h3>
              <p>support@curego.com</p>
            </div>

            <div>
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">
                Phone
              </h3>
              <p>+91 7610312515</p>
            </div>

            <div>
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">
                Location
              </h3>
              <p>Indore, Madhya Pradesh</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}