"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Pricing", href: "#pricing" },
    { name: "Safety", href: "#safety" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const programs = [
    { name: "Day Camp", href: "#day-camp" },
    { name: "Overnight Camp", href: "#overnight" },
    { name: "Adventure Camp", href: "#adventure" },
    { name: "Arts & Crafts", href: "#arts" },
    { name: "Sports Camp", href: "#sports" },
    { name: "Nature Camp", href: "#nature" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Stay Updated with Camp News!
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Get the latest updates on activities, events, and special offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 flex-1 px-4 py-2 rounded focus:outline-none"
              />
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 rounded transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">SC</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Summer Camp</h3>
                  <p className="text-gray-400 text-sm">Adventure Awaits</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating magical summer experiences for over 25 years.
                Where children discover their potential and create memories that last a lifetime.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Programs</h4>
              <ul className="space-y-3">
                {programs.map((program, index) => (
                  <li key={index}>
                    <Link
                      href={program.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                    >
                      {program.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HiOutlineLocationMarker className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-400">
                    123 Pine Lake Road<br />
                    Colorado Springs, CO 80906
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlinePhone className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-400">(555) 123-4567</p>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineMail className="w-5 h-5 text-orange-500" />
                  <p className="text-gray-400">info@summercamp.com</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h5 className="font-semibold mb-2">Camp Hours</h5>
                <p className="text-sm text-gray-400">
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© 2024 Summer Camp. All rights reserved.</span>
              <FaHeart className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
