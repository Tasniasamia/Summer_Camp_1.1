"use client";
import React from "react";
import Image from "next/image";
import { FaStar, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaArrowRight, FaPlay } from "react-icons/fa";
import { message } from "antd";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/summer-camp-pattern.png')] opacity-5"></div>

      <div className="container mx-auto px-4 py-44">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 text-sm font-medium rounded-full">
              <FaStar className="w-4 h-4" />
              #1 Rated Summer Camp 2024
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Create{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Magical
                </span>{" "}
                Summer Memories
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                Join us for an unforgettable adventure filled with outdoor activities,
                new friendships, and life-changing experiences in nature's playground.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 py-4">
              <div className="flex items-center gap-2 text-gray-700">
                <FaUsers className="text-orange-500" />
                <span className="font-semibold">500+ Happy Campers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-green-500" />
                <span className="font-semibold">Beautiful Location</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-semibold">8 Week Programs</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="flex text-white items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group rounded-lg"
              >
                Register Now
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button onClick={()=>{message.success("OKAY");console.log("hello")}}
                className="flex items-center cursor-pointer  justify-center border-2 border-orange-500 !text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold group rounded-lg"
              >
                <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                Watch Video
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2 font-medium">4.9/5 from 200+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/happy-campers.png"
                alt="Happy children enjoying summer camp activities"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800">Live Activities</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-orange-100 transform rotate-6 hover:rotate-3 transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">25+</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-green-100 transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">100%</div>
                <div className="text-sm text-gray-600">Safe & Fun</div>
              </div>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-96 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
