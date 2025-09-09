"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaDollarSign,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { Table, Tag } from "antd";
import SearchInput from "@/components/(site)/common/search";

const data = [
  {
    name: "Tasnia",
    course: "Swimming",
    createAt: "12-02-2025",
    status: "paid",
    paymentAmount: 50,
  },
  {
    name: "Sajib",
    course: "Mountain Hiking",
    createAt: "14-02-2025",
    status: "failed",
    paymentAmount: 0,
  },
  {
    name: "Sumaiya",
    course: "Yoga & Meditation",
    createAt: "15-02-2025",
    status: "paid",
    paymentAmount: 40,
  },
  {
    name: "Arif",
    course: "Kayaking Adventure",
    createAt: "16-02-2025",
    status: "pending",
    paymentAmount: 20,
  },
  {
    name: "Nusrat",
    course: "Cycling Tour",
    createAt: "17-02-2025",
    status: "paid",
    paymentAmount: 35,
  },
  {
    name: "Rahim",
    course: "Swimming",
    createAt: "18-02-2025",
    status: "paid",
    paymentAmount: 50,
  },
  {
    name: "Karim",
    course: "Mountain Hiking",
    createAt: "19-02-2025",
    status: "failed",
    paymentAmount: 0,
  },
  {
    name: "Rima",
    course: "Yoga & Meditation",
    createAt: "20-02-2025",
    status: "paid",
    paymentAmount: 40,
  },
  {
    name: "Shafin",
    course: "Kayaking Adventure",
    createAt: "21-02-2025",
    status: "pending",
    paymentAmount: 25,
  },
  {
    name: "Fahim",
    course: "Cycling Tour",
    createAt: "22-02-2025",
    status: "paid",
    paymentAmount: 35,
  },
];

const totalAmount = 1000;

export default function WalletPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const paidEnrollments = data.filter((item) => item.status === "paid");
  const pendingEnrollments = data.filter((item) => item.status === "pending");
  const failedEnrollments = data.filter((item) => item.status === "failed");

  const totalReceived = paidEnrollments.reduce(
    (sum, item) => sum + item.paymentAmount,
    0
  );
  const pendingAmount = pendingEnrollments.reduce(
    (sum, item) => sum + item.paymentAmount,
    0
  );

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="bg-green-100 text-green-800 w-fit px-3 py-2 rounded-md flex items-center gap-1 text-sm">
            <FaCheckCircle /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 w-fit px-3 py-2 rounded-md flex items-center gap-1 text-sm">
            <FaClock /> Pending
          </span>
        );
      case "failed":
        return (
          <span className="bg-red-100 text-red-800 w-fit px-3 py-2 rounded-md flex items-center gap-1 text-sm">
            <FaTimesCircle /> Failed
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Course", dataIndex: "course", key: "course" },
    {
      title: "Enrollment Date",
      dataIndex: "createAt",
      key: "createAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusBadge(status),
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Pending", value: "pending" },
        { text: "failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      align: "right",
      render: (amount) => (
        <span className={amount > 0 ? "text-green-600" : "text-gray-500"}>
          ${amount}
        </span>
      ),
    },
  ];

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <h1 className="text-2xl font-bold">Wallet Dashboard</h1>
        <p className="text-gray-600">
          Manage your course enrollments and payment tracking
        </p>

        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5">
          <div className="border border-gray-200 p-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg ">
            <h3 className="flex justify-between items-center font-medium">
              Total Balance <FaDollarSign />
            </h3>
            <h2 className="text-xl font-bold">${totalAmount}</h2>
            <p className="text-gray-500">Available balance</p>
          </div>
          <div className="border border-gray-200 p-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg ">
            <h3 className="flex justify-between items-center font-medium">
              Total Received <FaCheckCircle className="text-green-600" />
            </h3>
            <h2 className="text-xl font-bold text-green-600">
              ${totalReceived}
            </h2>
            <p className="text-gray-500">
              From {paidEnrollments.length} paid enrollments
            </p>
          </div>
          <div className="border border-gray-200 p-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg ">
            <h3 className="flex justify-between items-center font-medium">
              Pending Amount <FaClock className="text-orange-500" />
            </h3>
            <h2 className="text-xl font-bold text-orange-500">
              ${pendingAmount}
            </h2>
            <p className="text-gray-500">
              From {pendingEnrollments.length} pending payments
            </p>
          </div>
          <div className="border border-gray-200 p-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg ">
            <h3 className="flex justify-between items-center font-medium">
              Total Enrollments <FaUsers />
            </h3>
            <h2 className="text-xl font-bold">{data.length}</h2>
            <p className="text-gray-500">
              {failedEnrollments.length} failed enrollments
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-lg p-2 mt-4 shadow-2xl">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <div className="relative flex-1">
            <SearchInput />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md h-fit px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">failed</option>
          </select>
        </div>

        {/* AntD Table */}
        <div className="mt-3">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 5 }}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between mt-3 border-t pt-3 text-sm">
          <p>
            Showing {filteredData.length} of {data.length} enrollments
          </p>
          <div className="flex gap-4">
            <span className="text-green-600">
              Paid: {filteredData.filter((i) => i.status === "paid").length}
            </span>
            <span className="text-orange-500">
              Pending:{" "}
              {filteredData.filter((i) => i.status === "pending").length}
            </span>
            <span className="text-red-600">
              failed: {filteredData.filter((i) => i.status === "failed").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
