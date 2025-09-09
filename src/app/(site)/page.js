import AboutSection from '@/components/(site)/home/about';
import ClassesSection from '@/components/(site)/home/classSection';
import HeroSection from '@/components/(site)/home/hero';
import InstructorsSection from '@/components/(site)/home/instructorSection';
import PricingSection from '@/components/(site)/home/pricing';
import TestimonialsSection from '@/components/(site)/home/testimonialSection';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ClassesSection/>
      <InstructorsSection/>
      <TestimonialsSection/>
      <PricingSection/>
    </div>
  );
};

export default page;
