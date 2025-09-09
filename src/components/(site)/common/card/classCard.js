"use client";
import { useFetch, useMutationAction } from "@/helpers/utils/hooks";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaUsers,
  FaClock,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ClassCard = ({ classItem, wishlist, enrolledClasses }) => {
  const { push } = useRouter();
  const {
    data: user,
    isLoading: userLoading,
    error: err,
  } = useFetch("profile", "/user");
  // const enrollClass = useMutationAction("create", "/enroll", "enrollClass");
  console.log("user",user);
  return (
    <div className="group hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <Image
          src={classItem?.image?.secure_url}
          alt={classItem?.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        {/* <button
            onClick={() => toggleWishlist(classItem.id)}
            aria-label="Toggle wishlist"
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <FaHeart
              className={`w-5 h-5 transition-colors ${
                wishlist.includes(classItem.id) ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
            />
          </button> */}

        {/* Level Badge */}
        <span className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold select-none">
          {classItem?.category}
        </span>

        {/* Price */}
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold select-none">
          ${classItem?.price}/session
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {classItem?.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              with {classItem?.instructorId}
            </p>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            <span className="text-sm font-medium text-gray-900">
              {classItem?.rate}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-gray-600 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: classItem?.description }}
        ></p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaClock />
            <span>{classItem?.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers />
            <span>
              {classItem?.enrollment}/{classItem?.sit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span className="text-xs">
              {dayjs(classItem?.time).format("HH:mm a")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span className="text-xs">{classItem?.place}</span>
          </div>
        </div>

        {/* Enrollment Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Enrollment</span>
            <span className="font-medium">
              {classItem?.enrollment}/{classItem?.sit} spots
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(classItem?.enrollment / classItem?.sit) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full">
          <button
            className="bg-gradient-to-r from-orange-500 to-yellow-500 font-bold text-white !cursor-pointer w-full py-3 rounded-lg transition-all duration-300"
            // onClick={async () => {
            //   if (user?.data?.role === "student") {
            //     const res = await enrollClass.mutateAsync({
            //       classId: classItem?.id,
            //       userId: user?.data?.id,
            //     });
            //     console.log("res", res);
            //     if (res?.success) {
            //       window.location.href = res?.GatewayPageURL;
            //     }
            //   } else {
            //     push("/signup");
            //   }
            // }}
            // disabled={classItem?.enrollment === classItem?.sit}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
