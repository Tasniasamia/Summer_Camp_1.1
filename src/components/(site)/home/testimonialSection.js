'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from 'react-icons/fa'
import TestimonialCard from '../common/card/testimonialCard'

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      role: 'Parent of Emma (Age 10)',
      image: '/parent-jennifer.png',
      rating: 5,
      text: 'This summer camp has been absolutely incredible for Emma! She came home every day with the biggest smile, telling us about her swimming lessons with Sarah and all the new friends she made. The instructors are so caring and professional.',
      campYear: '2024',
      childActivities: ['Swimming', 'Arts & Crafts', 'Rock Climbing'],
    },
    {
      id: 2,
      name: 'Michael Thompson',
      role: 'Parent of Jake & Lily (Ages 8 & 12)',
      image: '/parent-michael.png',
      rating: 5,
      text: 'Both of my kids attended different programs and loved every minute! Jake discovered his passion for skateboarding with Mike, while Lily excelled in mountain biking with Lisa. The safety standards are exceptional.',
      campYear: '2024',
      childActivities: ['Skateboarding', 'Mountain Biking', 'Team Building'],
    },
    {
      id: 3,
      name: 'Sarah Kim',
      role: 'Parent of Alex (Age 9)',
      image: '/parent-sarah.png',
      rating: 5,
      text: "Alex was initially shy and hesitant, but the instructors, especially Emma in arts & crafts, helped him come out of his shell. He's now confident, creative, and already asking when he can come back next summer!",
      campYear: '2024',
      childActivities: ['Arts & Crafts', 'Canoeing', 'Nature Exploration'],
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Parent of Sofia (Age 11)',
      image: '/parent-david.png',
      rating: 5,
      text: 'Sofia has been coming here for 3 years now, and each year gets better! This year she tried rock climbing with Alex and absolutely loved it. The progression in her confidence and skills is remarkable.',
      campYear: '2022-2024',
      childActivities: ['Rock Climbing', 'Swimming', 'Leadership Program'],
    },
    {
      id: 5,
      name: 'Lisa Chen',
      role: 'Parent of Marcus (Age 7)',
      image: '/parent-lisa.png',
      rating: 5,
      text: "As a first-time camp parent, I was nervous, but the staff made the transition so smooth. Marcus learned to swim, made best friends, and gained so much independence. We couldn't be happier!",
      campYear: '2024',
      childActivities: ['Swimming', 'Team Sports', 'Nature Walks'],
    },
    {
      id: 6,
      name: 'Emma Wilson',
      role: 'Camper (Age 12)',
      image: '/camper-emma.png',
      rating: 5,
      text: "This camp is the BEST! I love swimming with Sarah - she taught me how to dive! I also made so many friends in arts and crafts. I can't wait to come back next year and try rock climbing!",
      campYear: '2024',
      childActivities: ['Swimming', 'Arts & Crafts', 'Friendship Building'],
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-yellow-100 text-yellow-800 hover:bg-yellow-200 mb-4 px-4 py-1 rounded-full cursor-default">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Families{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from the parents and campers who have
            experienced the magic of our summer camp firsthand.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 hover:bg-yellow-50 shadow-lg p-3 rounded-full"
          >
            <FaChevronLeft className="w-5 h-5 text-yellow-600" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 hover:bg-yellow-50 shadow-lg p-3 rounded-full"
          >
            <FaChevronRight className="w-5 h-5 text-yellow-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 px-12">
            {getVisibleTestimonials().map((testimonial, index) => (
             <TestimonialCard testimonial={testimonial} key={index} index={index}/>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { number: '4.9', label: 'Average Rating', suffix: '/5' },
            { number: '500+', label: 'Happy Families', suffix: '' },
            { number: '98%', label: 'Return Rate', suffix: '' },
            { number: '25+', label: 'Years Trusted', suffix: '' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-xl p-6 shadow-lg select-none"
            >
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {stat.number}
                {stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of families who have made unforgettable memories at our summer camp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
                type="button"
              >
                Register Your Child
              </button>
              <button
                className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-8 py-3 rounded-lg font-semibold transition"
                type="button"
              >
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
