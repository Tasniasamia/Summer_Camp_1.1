"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import ClassCard from "../common/card/classCard";
import CustomPagination from "../common/pagination/pagination";
import { Empty } from "antd";
import { useFetch } from "@/helpers/utils/hooks";
import { getAllCategory, getAllClass } from "@/helpers/utils/api";
import Pagination from "../common/pagination/pagination";

export default function ClassesSection() {
  const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page); // শুধু state update হবে
  // };

  const { data, loading, isError, error } = useFetch("class", getAllClass, {
    limit: 2,
    page: currentPage,
  });
  const {
    data: categories,
    isLoading,
    error: err,
  } = useFetch("category", getAllCategory);

  console.log("categories", categories);

  const [activeCategory, setActiveCategory] = useState("all");
  console.log("activeCategory", activeCategory);

  const filteredClasses =
    activeCategory === "all"
      ? data?.data?.data?.docs
      : data?.data?.data?.docs?.filter((c) => c?.categoryId == activeCategory);
  console.log("filteredClasses", filteredClasses);
  return (
    <section id="classes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-800 hover:bg-orange-200 mb-4 px-4 py-1 rounded-full cursor-default">
            Camp Classes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Passion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide variety of exciting classes led by expert
            instructors. Build skills, make friends, and create unforgettable
            memories.
          </p>
        </div>
        {/* Categories Tabs */}
        <div className="w-full capitalize mb-12 grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-100 p-1 rounded-xl select-none">
          <button
            onClick={() => setActiveCategory("all")}
            className={`font-medium py-2 rounded-xl transition-colors ${
              activeCategory === "all"
                ? "bg-white text-orange-600 shadow"
                : "text-gray-700 hover:bg-white hover:text-orange-600"
            }`}
          >
            All
          </button>
          {categories?.data?.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category?.id)}
              className={`font-medium py-2 rounded-xl capitalize transition-colors ${
                activeCategory === category?.id
                  ? "bg-white text-orange-600 shadow"
                  : "text-gray-700 hover:bg-white hover:text-orange-600"
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
        {/* Classes Grid */}
        {filteredClasses?.length === 0 ? (
          <Empty description="No Class" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses?.map((classItem, index) => (
              <ClassCard classItem={classItem} key={index} />
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalItems={data?.data?.data?.totalDocs} // মোট item সংখ্যা
          limit={data?.data?.data?.limit}
          onPageChange={(p) => setCurrentPage(p)}
          pageSizeOptions={null} // চাইলে ["5","10","20"] দিতে পারো
        />
      </div>
    </section>
  );
}
