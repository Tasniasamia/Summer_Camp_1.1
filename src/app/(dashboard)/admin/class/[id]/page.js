"use client";
import { useFetch } from "@/helpers/utils/hooks";
import dayjs from "dayjs";
import Image from "next/image";
import { use } from "react";
import toast from "react-hot-toast";
import {
  HiClock,
  HiCalendar,
  HiLocationMarker,
  HiUserGroup,
  HiShieldCheck,
  HiUser,
  HiStar,
  HiPhone,
  HiMail,
  HiLightningBolt,
} from "react-icons/hi";

export default function ActivityDetails({params}) {
  const resolvedParams = use(params); // unwrap Promise
  const {
    data: getClass,
    isLoading: loading2,
    error: err,
  } = useFetch("class", `/class?id=${resolvedParams?.id}`);
  // const activity = {
  //   name: "Swimming & Water Sports",
  //   instructor: "Sarah Johnson",
  //   rate: 4.9,
  //   description:
  //     "Learn swimming techniques and enjoy water sports in our pristine lake with certified lifeguards.",
  //   duration: "2 hours",
  //   days: ["Mon", "Wed", "Fri"],
  //   time: "10:00 AM",
  //   place: "Pine Lake",
  //   createDate: "2025-08-10",
  //   capacity: 10,
  //   enrollment: 8,
  //   category: "water",
  // };

  const enrollmentPercentage = (getClass?.enrollment / getClass?.sit) * 100;
  const availableSpots = getClass?.sit - getClass?.enrollment;
  const {
    data: users,
    isLoading: loadingUsers,
    error: errUsers,
  } = useFetch("user", "/getUsers");
  const instructor = users?.find((i) => i?.id === getClass?.instructorId);
  console.log("find instructor",instructor);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-cyan-50">
      <div>
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-64 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg overflow-hidden relative">
         
            <div className="absolute inset-0 bg-black/20 flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white border border-white/30">
                    <HiLightningBolt className="w-3 h-3 mr-1" />
                    {getClass?.place}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{getClass?.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">{getClass?.rate}</span>
                  </div>
                  <span className="text-white/80">•</span>
                  <span className="text-white/90">Instructor: {instructor?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
                <HiShieldCheck className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">About This Activity</h2>
              </header>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed"dangerouslySetInnerHTML={{__html:getClass?.description}}></p>
              </div>
            </section>

            {/* Schedule & Details Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Schedule & Details</h2>
              </header>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <HiClock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600">{getClass?.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <HiCalendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-gray-600">
                        {getClass?.days.join(", ")} at {dayjs(getClass?.time).format('HH:MM a')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <HiLocationMarker className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{getClass?.place}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <HiUserGroup className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p className="text-gray-600">Max {getClass?.sit} participants</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Instructor Info Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
                <HiUser className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Your Instructor</h2>
              </header>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  <Image src={instructor?.image?.secure_url || "/default.jpg"} width={100} height={100} className="h-16 w-16 object-cover" alt="image"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{instructor?.name}</h3>
                    <p className="text-gray-600 mb-3">Certified {getClass?.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <HiStar className="w-4 h-4 text-yellow-400" />
                        <span>{instructor?.rate || 0} rating</span>
                      </div>
                      <span>•</span>
                      <span>{instructor?.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Status Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Enrollment Status</h2>
                <p className="text-sm text-gray-500">{availableSpots} spots remaining</p>
              </header>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Enrolled</span>
                    <span>
                      {getClass?.enrollment}/{getClass?.sit}
                    </span>
                  </div>
                  {/* Custom progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${enrollmentPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Quick Info</h2>
              </header>
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="capitalize inline-block bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium">
                    {getClass?.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">
                    {new Date(getClass?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{getClass?.rate}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Card */}
            <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg shadow-lg">
              <header className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Need Help?</h2>
              </header>
              <div className="p-6 space-y-3">
                <button onClick={()=>{toast.warning("Coming Soon")}} className="w-full flex items-center gap-2 border border-orange-600 text-orange-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-orange-50 transition">
                  <HiPhone className="w-4 h-4" />
                  Call Instructor
                </button>
                <button onClick={()=>{toast.warning("Coming Soon")}}  className="w-full flex items-center gap-2 border border-orange-600 text-orange-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-orange-50 transition">
                  <HiMail className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
