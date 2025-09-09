"use client";
import CommonTable from "@/components/(site)/common/table/table";
import { useAuth } from "@/helpers/context/authContext";
import { useFetch } from "@/helpers/utils/hooks";
import { useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
   const { user } = useAuth();
  const {
    data: classes,
    isLoading,
    error,
  } = useFetch(`enroll`, `/getEnrolledClass?id=${user?.id}`,{search});
  
  const columns = [
    {
      title: "Class",
      key: "className",
      render: (_, record) => record.class?.name || "N/A",
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) =>
        record.class?.category
          ? record.class.category.charAt(0).toUpperCase() +
            record.class.category.slice(1)
          : "N/A",
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => `$${record.class?.price || 0}`,
    },
    {
      title: "Instructor",
      key: "instructor",
      render: (_, record) =>
        record.class?.instructor
          ? `${record.class.instructor.name} (${record.class.instructor.email})`
          : "N/A",
    },

    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${
            status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : status === "paid"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Enrolled At",
      key: "createdAt",
      render: (_, record) =>
        record.createdAt
          ? new Date(record.createdAt).toLocaleDateString()
          : "N/A",
    },
  ];

  return (
    <div>
      <CommonTable
        columns={columns}
        isSearch={true}
        data={classes}
        noActions={true}
        setSearch={setSearch}
      />
    </div>
  );
};

export default page;
