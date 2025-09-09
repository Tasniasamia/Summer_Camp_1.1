"use client";
import { Progress, Tooltip } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const About2 = ({ data }) => {
  
  const [percent, setPercent] = useState(0);
  const animationRef = useRef();

  useEffect(() => {
    const target = parseInt(75);
    let current = 0;

    animationRef.current = setInterval(() => {
      current += 1;
      setPercent(current);

      if (current >= target) {
        clearInterval(animationRef.current);
      }
    }, 20);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  const services = [
    "Accurate Testing Processes",
    "300+ Successful Projects done",
    "Complete Satisfaction Guarantee",
    "Professional Engineers Provide",
  ];
  return (
    <div className="bg-primary">
      <div className="max-w-[1509px] mx-auto flex  flex-col lg:flex-row gap-[40px]">
        <div className="2xl2:h-[729px]  2xl2:w-1/2 w-1/2  lg:h-[729px] md:h-[729px]  md:block hidden">
          <div className="h-full relative">
            <Image
              src="/about.png"
              width={1000}
              height={100}
              className="object-fill  2xl2:h-[554px] 2xl2:w-[429px]   2xl1:w-[380px] 2xl1:h-[480px]  md:w-[429px] md:h-[500px] custom-xl1:w-[100px] custom-xl1:h-[200px]"
            />
            <Image
              src="/about2.png"
              width={1000}
              height={100}
              className="absolute  top-[154px] object-fill  2xl2:left-[300px] 2xl2:h-[554px] 2xl2:w-[429px]  xl:w-[400px] xl:h-[480px]  xl:left-[300px]  md:w-[429px] md:h-[500px] md:left-[300px]"
            />
            <div className="bg-green-200 absolute 2xl2:left-0  xl:left-0   2xl2:bottom-[15px]   bottom-0 2xl1:bottom-[90px] md:bottom-[70px] z-20 flex w-[240px] items-center gap-[20px] rounded-[10px] bg-primary p-4 sm:w-[300px] sm:gap-[30px] md:w-fit xl:w-auto ]">
              <div className="grid h-[80px] w-[80px] place-content-center rounded-[10px] bg-[#F3FBF2] sm:h-[110px] sm:w-[119px]">
                <Image
                  src="/svg.png"
                  width={80}
                  height={80}
                  className="h-[60px] w-[60px] object-fill sm:h-[80px] sm:w-[80px]"
                  alt="aboutvector"
                />
              </div>
              <div>
                <h3 className="font-dm-sans mb-[6px] text-[36px] font-bold leading-[44px] text-shadow-green-400">
                  25
                </h3>
                <h5 className="w-[107px] font-roboto text-base font-normal text-shadow-green-400">
                  Years Working Experience
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 2xl2:w-1/2 w-full">
          <div>
            <div className="mb-[12px] flex items-center gap-2 lg:mb-[24px]">
              <Image
                src="/frame.png"
                width={24}
                height={24}
                className="h-[24px] w-[24px] object-cover"
                alt="frame"
              />
              <h6 className="section-name">About us</h6>
            </div>
            <h2 className="section-title line-clam-2 w-full pb-[12px] text-textMain lg:pb-[24px] xl:w-[calc(100%-100px)]">
              Leading the Solar Movement
            </h2>

            <p className="section-description mb-[20px] line-clamp-4 w-full text-[#7C7C86] lg:mb-[40px] ">
              Whether you’re a homeowner, business, or nonprofit, electricity
              costs can make up a large portion of your monthly expenses. Even
              if you don’t produce 100% of the energy you consume, solar will
              reduce your utility bills, saving you a lot of money. With the
              cost of solar becoming more affordable it is now more affordable
              than ever.
            </p>

            <div className="mb-[12px] flex flex-col gap-[20px] sm:flex-row sm:gap-[40px] lg:mb-[30px] xl:gap-[120px]">
              <div className="text-text_primary flex flex-col gap-[20px]">
                {services.slice(0, 2)?.map((i, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[12px] font-roboto text-base font-medium"
                  >
                    <IoMdCheckmarkCircleOutline className="h-6 min-h-[24px] w-6 min-w-[24px] text-[#398A2F]" />
                    {i}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[20px]">
                {services.slice(2, 4)?.map((i, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[12px] font-roboto text-base font-medium"
                  >
                    <IoMdCheckmarkCircleOutline className="h-6 min-h-[24px] w-6 min-w-[24px] text-[#398A2F]" />
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <p className="section-description text-text_secondary mb-[20px] line-clamp-2 lg:mb-[40px]">
            Whether you’re a homeowner, business, or nonprofit, electricity costs can make up a large portion of your monthly expenses. Even if you don’t produce 100% of the energy you consume.
            </p>

            <div className="mb-[30px] w-full lg:mb-[56px] xl:w-[527px]">
              <p className="text-text_primary mb-[16px] font-roboto text-base font-medium">
              Quality Services
              </p>
              {percent > 0 && (
                <Tooltip
                  title={`${percent}%`}
                  overlayInnerStyle={{
                    backgroundColor: "green",
                    color: "white",
                  }}
                  overlayClassName="custom-tooltip"
                >
                  <Progress
                    percent={percent}
                    strokeColor={"#6FC464"}
                    strokeWidth={15}
                    percentPosition={{ align: "end", type: "outer" }}
                  />
                </Tooltip>
              )}
            </div>

            <button
              onClick={() => {
                route.push("/about");
              }}
              className="hover:bg-orange-300 rounded-[30px] bg-orange-400 px-[32px] py-[16px] text-center font-roboto text-[18px] font-medium text-white sm:px-[75px]"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About2;
