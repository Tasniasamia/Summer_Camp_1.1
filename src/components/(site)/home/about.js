import Image from "next/image";
import { FaShieldAlt, FaHeart, FaUsers, FaAward, FaTree, FaBolt } from "react-icons/fa";

export default function AboutSection() {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Safety First",
      description: "24/7 supervision with certified lifeguards and medical staff on-site"
    },
    {
      icon: FaHeart,
      title: "Character Building",
      description: "Programs designed to build confidence, leadership, and lasting friendships"
    },
    {
      icon: FaUsers,
      title: "Expert Staff",
      description: "Experienced counselors with backgrounds in education and child development"
    },
    {
      icon: FaAward,
      title: "Award Winning",
      description: "Recognized as the #1 summer camp in Colorado for 3 consecutive years"
    },
    {
      icon: FaTree,
      title: "Nature Immersion",
      description: "200 acres of pristine wilderness with lakes, trails, and outdoor activities"
    },
    {
      icon: FaBolt,
      title: "Skill Development",
      description: "Wide range of activities from arts & crafts to adventure sports"
    }
  ];

  const stats = [
    { number: "25+", label: "Years Experience" },
    { number: "500+", label: "Happy Campers" },
    { number: "50+", label: "Activities" },
    { number: "98%", label: "Return Rate" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full mb-4">
            About Our Camp
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Where Adventure Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Growth
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over 25 years, we've been creating magical summer experiences that help children 
            discover their potential, build lasting friendships, and create memories that last a lifetime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission & Values
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                We believe every child deserves the opportunity to explore, learn, and grow in a 
                safe and nurturing environment. Our camp is more than just fun activities – it's 
                a place where children develop life skills, build confidence, and create bonds 
                that last forever.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Inclusive Environment",
                    desc: "Welcoming campers of all backgrounds and abilities"
                  },
                  {
                    title: "Personal Growth",
                    desc: "Encouraging each child to step out of their comfort zone"
                  },
                  {
                    title: "Environmental Stewardship",
                    desc: "Teaching respect and care for our natural world"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-semibold transition">
              Learn More About Us
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/happy-campers.png"
                alt="Children participating in various camp activities"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-500">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group rounded-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
