"use client";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="group cursor-pointer relative overflow-hidden rounded-full bg-gradient-to-r from-orange-400 to-amber-400 p-3 shadow-lg transition-all duration-300 hover:from-orange-500 hover:to-amber-500 hover:shadow-xl hover:scale-105 active:scale-95"
      onClick={() => router.back()}
      aria-label="Go Back"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
      <HiArrowLeft className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
    </button>
  );
};

const Title = ({ title, noBack = true, customComponent }) => {
  return (
    <div className="relative mb-6 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6 sm:p-4 ">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200 to-yellow-200 opacity-30 blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-tr from-amber-200 to-orange-200 opacity-20 blur-2xl"></div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-3xl sm:text-2xl font-bold text-transparent drop-shadow-sm truncate">
            {title}
          </h1>
          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-sm"></div>
        </div>
        {noBack && <BackButton />}
        {customComponent}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 opacity-60"></div>
    </div>
  );
};

export default Title;
