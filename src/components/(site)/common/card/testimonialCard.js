import React from "react";
import Image from "next/image";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div
      className={`group hover:shadow-2xl transition-all duration-500 border border-transparent shadow-lg overflow-hidden rounded-lg bg-white ${
        index === 1 ? "md:scale-105 md:shadow-2xl" : ""
      }`}
    >
      <div className="p-8 space-y-6">
        {/* Quote Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <FaQuoteLeft className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center gap-1 text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-700 leading-relaxed text-center italic">
          &quot;{testimonial.text}&quot;
        </p>

        {/* Activities */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 text-center">
            Activities Enjoyed:
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {testimonial.childActivities.map((activity, actIndex) => (
              <span
                key={actIndex}
                className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full cursor-default select-none hover:bg-orange-200"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <Image
            src="/happy-campers.png"
            alt={testimonial.name}
            width={60}
            height={60}
            className="w-15 h-15 rounded-full object-cover border-2 border-yellow-200"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <p className="text-xs text-yellow-600 font-medium">
              Camp Year: {testimonial.campYear}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
