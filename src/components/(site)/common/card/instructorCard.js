import React from 'react';
import Image from "next/image";
import {
  FaStar,
  FaAward,
  FaUsers,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const InstructorCard = ({instructor}) => {
    return (
        <div
        
        className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white rounded-lg"
      >
        {/* Profile Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src="/happy-campers.png"
            alt={instructor.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
            <FaStar className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">
              {instructor.rating}
            </span>
          </div>

          {/* Experience Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {instructor.experience} exp
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Basic Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {instructor.name}
            </h3>
            <p className="text-purple-600 font-medium mb-2">
              {instructor.title}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaUsers className="w-4 h-4" />
                <span>{instructor.reviews} reviews</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{instructor.experience}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            {instructor.bio}
          </p>

          {/* Specialties */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {instructor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs bg-purple-100 text-purple-700 rounded-full px-3 py-1 hover:bg-purple-200 cursor-default"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2 justify-center">
              <FaAward className="w-4 h-4 text-yellow-500" />
              Certifications
            </h4>
            <ul className="text-xs text-gray-600 space-y-1 max-w-xs mx-auto">
              {instructor.certifications
                .slice(0, 2)
                .map((cert, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                    {cert}
                  </li>
                ))}
              {instructor.certifications.length > 2 && (
                <li className="text-purple-600 font-medium text-center">
                  +{instructor.certifications.length - 2} more
                </li>
              )}
            </ul>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-2 pt-4">
            <a
              href={`mailto:${instructor.email}`}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs py-2 rounded-lg flex items-center justify-center gap-1"
            >
              <FaEnvelope className="w-3 h-3" />
              Contact
            </a>
            <a
              href="#"
              className="flex-1 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-xs py-2 rounded-lg flex items-center justify-center"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    );
};

export default InstructorCard;