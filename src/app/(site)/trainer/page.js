"use client";
import React from "react";
import { Card, Row, Col, Table, Statistic } from "antd";
import { BookOutlined, HeartOutlined } from "@ant-design/icons";

// Dummy data
const enrolledCount = 12;
const wishlistCount = 5;

const topCourses = [
  { key: 1, course: "JavaScript Fundamentals", students: 250 },
  { key: 2, course: "React for Beginners", students: 210 },
  { key: 3, course: "Python Basics", students: 200 },
  { key: 4, course: "Fullstack MERN Development", students: 180 },
  { key: 5, course: "Data Structures & Algorithms", students: 150 },
];

// Table columns
const columns = [
  { title: "Course Name", dataIndex: "course", key: "course" },
  { title: "Enrolled Students", dataIndex: "students", key: "students" },
];

export default function UserDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Stats Section */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} lg={12}>
          <Card className="shadow-md">
            <Statistic
              title={(<span className=" text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Total Enrolled Classes</span>)}
              value={enrolledCount}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <Card className="shadow-md">
            <Statistic
              title={(<span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Total WishList Classes</span>)}
              value={wishlistCount}
              prefix={<HeartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Top Courses Table */}
      <Card title="Top 5 Enrolled Courses" className="shadow-md">
        <Table
          columns={columns}
          dataSource={topCourses}
          pagination={false}
          bordered
        />
      </Card>
    </div>
  );
}
