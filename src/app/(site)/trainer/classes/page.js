"use client";
import CommonTable from "@/components/(site)/common/table/table";
import { useRouter } from "next/navigation";

const page = () => {
    const columns = [
        {
          title: "Class Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Total Enrollments",
          key: "totalEnrollments",
          render: (_, record) => record.students?.length || 0,
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          render: (cat) => cat.charAt(0).toUpperCase() + cat.slice(1),
        },
        {
          title: "Image",
          dataIndex: "image",
          key: "image",
          render: (imgUrl) =>
            imgUrl ? (
              <img
                src={imgUrl}
                alt="Class Image"
                className="w-16 h-10 object-cover rounded"
              />
            ) : (
              <span>No Image</span>
            ),
        },
        {
          title: "Remaining Seats",
          key: "remainingSeats",
          render: (_, record) => record.sit - record.enrollment,
        },
        {
          title: "Enrollment Time",
          dataIndex: "createDate",
          key: "createDate",
          render: (date) => new Date(date).toLocaleDateString(),
        },
        {
          title: "Class Status",
          dataIndex: "status",
          key: "status",
          render: (status) => (
            <span
              className={`px-2 py-1 rounded text-sm font-semibold ${
                status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          ),
        },
      ];
      const data = [
        {
          name: "Swimming & Water Sports",
          instructor: "Sarah Johnson",
          rate: 4.9,
          description:
            "Learn swimming techniques and enjoy water sports in our pristine lake with certified lifeguards.",
          duration: "2 hours",
          days: ["Mon", "Wed", "Fri"],
          time: "10:00 AM",
          place: "Pine Lake",
          createDate: "2025-08-10",
          sit: 10,
          enrollment: 8,
          status: "active",
          category: "water",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          students: [
            { name: "Tasnia", email: "tasnia@gmail.com", phone: "01293", age: 12 },
            { name: "Rafi", email: "rafi@gmail.com", phone: "01700", age: 15 },
          ],
        },
        {
          name: "Mountain Hiking",
          instructor: "David Carter",
          rate: 4.8,
          description:
            "Explore scenic trails and learn safe hiking techniques with an experienced guide.",
          duration: "4 hours",
          days: ["Tue", "Thu", "Sat"],
          time: "6:00 AM",
          place: "Evergreen Mountains",
          createDate: "2025-08-12",
          sit: 15,
          enrollment: 12,
          status: "active",
          category: "adventure",
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80",
          students: [
            { name: "Shahin", email: "shahin@gmail.com", phone: "01900", age: 18 },
            { name: "Nabila", email: "nabila@gmail.com", phone: "01800", age: 17 },
            { name: "Rana", email: "rana@gmail.com", phone: "01600", age: 19 },
          ],
        },
        {
          name: "Yoga & Meditation",
          instructor: "Emily Brown",
          rate: 4.7,
          description:
            "Relax and strengthen your body with yoga poses followed by guided meditation.",
          duration: "1.5 hours",
          days: ["Mon", "Wed", "Fri"],
          time: "7:00 AM",
          place: "Sunrise Garden",
          createDate: "2025-08-15",
          sit: 20,
          enrollment: 18,
          status: "inactive",
          category: "exercise",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
          students: [
            { name: "Amina", email: "amina@gmail.com", phone: "01500", age: 22 },
            { name: "Rakib", email: "rakib@gmail.com", phone: "01750", age: 24 },
            { name: "Sumaiya", email: "sumaiya@gmail.com", phone: "01650", age: 21 },
          ],
        },
        {
          name: "Kayaking Adventure",
          instructor: "Michael Lee",
          rate: 4.85,
          description:
            "Paddle through calm and challenging waters with safety instructions and fun races.",
          duration: "3 hours",
          days: ["Sat", "Sun"],
          time: "9:00 AM",
          place: "Blue River",
          createDate: "2025-08-18",
          sit: 12,
          enrollment: 9,
          status: "active",
          category: "adventure",
          image:
            "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80",
          students: [
            { name: "Fahim", email: "fahim@gmail.com", phone: "01950", age: 20 },
            { name: "Nusrat", email: "nusrat@gmail.com", phone: "01850", age: 19 },
          ],
        },
        {
          name: "Cycling Tour",
          instructor: "Anna White",
          rate: 4.6,
          description:
            "Join a scenic cycling tour covering beautiful landscapes and safe riding practices.",
          duration: "2.5 hours",
          days: ["Tue", "Thu"],
          time: "5:00 PM",
          place: "Green Valley",
          createDate: "2025-08-20",
          sit: 25,
          enrollment: 21,
          status: "active",
          category: "adventure",
          image:
            "https://images.unsplash.com/photo-1507537509458-b8312d32bd5f?auto=format&fit=crop&w=400&q=80",
          students: [
            { name: "Sadia", email: "sadia@gmail.com", phone: "01730", age: 23 },
            { name: "Imran", email: "imran@gmail.com", phone: "01670", age: 25 },
            { name: "Kamal", email: "kamal@gmail.com", phone: "01580", age: 24 },
          ],
        },
      ];
  
  return (
    <div>
     <CommonTable
        columns={columns}
        isSearch={true}
        data={data}
        onDelete={(rec) => console.log(rec)}
      />
    </div>
  );
};

export default page;
