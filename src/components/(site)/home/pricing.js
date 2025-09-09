import { FaCheck, FaStar } from "react-icons/fa";

export default function PricingSection() {
  const plans = [
    {
      name: "Explorer",
      price: 299,
      duration: "1 Week",
      description: "Perfect for first-time campers",
      popular: false,
      features: [
        "5 days of camp activities",
        "Swimming & water sports",
        "Arts & crafts sessions",
        "Nature walks & exploration",
        "Daily snacks included",
        "Camp t-shirt & certificate",
        "Photo memories package"
      ]
    },
    {
      name: "Adventurer",
      price: 799,
      duration: "3 Weeks",
      description: "Our most popular program",
      popular: true,
      features: [
        "Everything in Explorer",
        "Rock climbing & zip-lining",
        "Overnight camping trips",
        "Canoeing & kayaking",
        "Team building challenges",
        "Campfire stories & s'mores",
        "Leadership development",
        "Weekly progress reports"
      ]
    },
    {
      name: "Champion",
      price: 1499,
      duration: "6 Weeks",
      description: "Complete summer transformation",
      popular: false,
      features: [
        "Everything in Adventurer",
        "Advanced outdoor skills",
        "Multi-day wilderness trips",
        "Specialized skill workshops",
        "Junior counselor training",
        "Community service projects",
        "End-of-summer showcase",
        "Alumni network access",
        "Priority booking next year"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-800 hover:bg-orange-200 px-4 py-1 rounded-full mb-4 cursor-default">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Adventure
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible programs designed to fit your schedule and budget. 
            All plans include meals, supervision, and unforgettable memories.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative border-2 transition-all duration-300 rounded-lg p-8 flex flex-col ${
                plan.popular
                  ? "border-orange-500 shadow-xl scale-105"
                  : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 text-sm font-semibold rounded-full select-none">
                    <FaStar className="w-4 h-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              <header className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="space-y-2">
                  <div className="text-5xl font-bold text-gray-900">${plan.price}</div>
                  <div className="text-gray-500">{plan.duration}</div>
                </div>
              </header>

              <main className="flex-grow space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheck className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-6 text-lg font-semibold rounded transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  {plan.popular ? "Get Started" : "Choose Plan"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  No hidden fees • Full refund if cancelled 30 days before
                </p>
              </main>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Plan?</h3>
            <p className="text-gray-600 mb-6">
              We offer flexible scheduling and custom programs for groups, schools, 
              and families with special requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition">
                Contact Us
              </button>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
