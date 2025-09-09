"use client";
import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";
const Banner = ({ title }) => {
  return (
    <div
      className="relative  bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden h-[300px]  "
    >       <div className="absolute inset-0 bg-[url('/summer-camp-pattern.png')] opacity-5"></div>

      <div className="container text-center md:pt-[100px] pt-[50px]">
        <h2 className="header-1 text-orange-500  ">
          {title}
        </h2>
        <p className="flex justify-center items-center gap-2 md:mt-2 text-lg font-medium text-orange-500  ">
          <Link href="/">Home</Link>{" "}
          <TbArrowNarrowRight className="text-primary h-6 w-6" />{" "}
          <span className="text-primary">{title}</span>
        </p>
      </div>
      </div>
  );
};

export default Banner;
