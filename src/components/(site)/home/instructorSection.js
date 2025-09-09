
import InstructorCard from "../common/card/instructorCard";

export default function InstructorsSection() {
  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Swimming & Water Sports Instructor",
      image: "/instructor-sarah.png",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      specialties: ["Swimming", "Water Safety", "Diving", "Water Polo"],
      certifications: [
        "Red Cross Lifeguard",
        "Water Safety Instructor",
        "CPR Certified",
      ],
      bio: "Sarah is a former competitive swimmer with a passion for teaching water safety and swimming techniques to children of all ages.",
      achievements: [
        "Olympic Training Camp Alumni",
        "State Swimming Champion",
        "Youth Coach of the Year 2023",
      ],
      email: "sarah@summercamp.com",
      phone: "(555) 123-4567",
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      title: "Skateboarding & Action Sports Coach",
      image: "/instructor-mike.png",
      experience: "6 years",
      rating: 4.8,
      reviews: 89,
      specialties: ["Skateboarding", "BMX", "Scootering", "Safety Training"],
      certifications: [
        "Action Sports Instructor",
        "First Aid Certified",
        "Youth Development",
      ],
      bio: "Mike brings his professional skateboarding background to help kids learn action sports safely while building confidence.",
      achievements: [
        "Pro Skater (2015-2019)",
        "X-Games Participant",
        "Safety Innovation Award",
      ],
      email: "mike@summercamp.com",
      phone: "(555) 234-5678",
    },
    {
      id: 3,
      name: "Alex Chen",
      title: "Rock Climbing & Adventure Guide",
      image: "/instructor-alex.png",
      experience: "10 years",
      rating: 5.0,
      reviews: 156,
      specialties: [
        "Rock Climbing",
        "Rappelling",
        "Outdoor Survival",
        "Team Building",
      ],
      certifications: [
        "Certified Climbing Instructor",
        "Wilderness First Aid",
        "Rescue Technician",
      ],
      bio: "Alex is a seasoned mountaineer who loves sharing the thrill of climbing while emphasizing safety and environmental respect.",
      achievements: [
        "Everest Summit 2020",
        "Mountain Rescue Team Leader",
        "Adventure Education Pioneer",
      ],
      email: "alex@summercamp.com",
      phone: "(555) 345-6789",
    },
    {
      id: 4,
      name: "Emma Wilson",
      title: "Arts & Crafts Director",
      image: "/instructor-emma.png",
      experience: "12 years",
      rating: 4.7,
      reviews: 203,
      specialties: ["Painting", "Sculpture", "Jewelry Making", "Digital Art"],
      certifications: [
        "Art Education Degree",
        "Child Development Specialist",
        "Creative Therapy",
      ],
      bio: "Emma combines her fine arts background with child psychology to create engaging and therapeutic art experiences.",
      achievements: [
        "Gallery Featured Artist",
        "Children's Art Program Developer",
        "Creative Excellence Award",
      ],
      email: "emma@summercamp.com",
      phone: "(555) 456-7890",
    },
    {
      id: 5,
      name: "David Park",
      title: "Canoeing & Kayaking Specialist",
      image: "/instructor-david.png",
      experience: "7 years",
      rating: 4.9,
      reviews: 94,
      specialties: [
        "Canoeing",
        "Kayaking",
        "River Navigation",
        "Water Ecology",
      ],
      certifications: [
        "Paddle Sports Instructor",
        "Swift Water Rescue",
        "Environmental Education",
      ],
      bio: "David's expertise in paddle sports and environmental science creates unique learning experiences on the water.",
      achievements: [
        "National Kayak Champion",
        "River Conservation Advocate",
        "Youth Mentor Award",
      ],
      email: "david@summercamp.com",
      phone: "(555) 567-8901",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      title: "Mountain Biking Coach",
      image: "/instructor-lisa.png",
      experience: "9 years",
      rating: 4.8,
      reviews: 112,
      specialties: [
        "Mountain Biking",
        "Trail Riding",
        "Bike Maintenance",
        "Endurance Training",
      ],
      certifications: [
        "Cycling Coach Level 3",
        "Bike Mechanic Certified",
        "Sports Psychology",
      ],
      bio: "Lisa's competitive cycling background and mechanical expertise help campers master biking skills and bike care.",
      achievements: [
        "National MTB Champion",
        "Bike Safety Advocate",
        "Trail Development Consultant",
      ],
      email: "lisa@summercamp.com",
      phone: "(555) 678-9012",
    },
  ];

  return (
    <section
      id="instructors"
      className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-1 rounded-full mb-4 cursor-default">
            Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Instructors
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our passionate and certified instructors bring years of experience
            and expertise to ensure every camper has a safe, fun, and
            educational experience.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor,index) => (
         <InstructorCard instructor={instructor} key={index}/>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-600 mb-6">
              We're always looking for passionate and qualified instructors to
              join our summer camp family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                Apply Now
              </button>
              <button className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
