"use client";
import CommonTable from "@/components/(site)/common/table/table";
import Title from "@/components/(site)/common/title";
import { useRouter } from "next/navigation";

const page = () => {
    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Role", dataIndex: "role", key: "role" },
      ];
      const data = [
    {
      key: '1',
      name: 'Tasnia Sharin',
      email: 'tasnia@gmail.com',
      phone: '01923432123',
      address: 'Khulna, Bangladesh',
      role: 'Instructor',
    },
    {
      key: '2',
      name: 'Sajib Ahmed',
      email: 'sajib@example.com',
      phone: '01711223344',
      address: 'Dhaka, Bangladesh',
      role: 'User',
    },
    {
      key: '3',
      name: 'Sumaiya Khan',
      email: 'sumaiya@example.com',
      phone: '01899887766',
      address: 'Chittagong, Bangladesh',
      role: 'User',
    },
    {
      key: '4',
      name: 'Arif Hasan',
      email: 'arif@example.com',
      phone: '01655667788',
      address: 'Sylhet, Bangladesh',
      role: 'Instructor',
    },
       ];
  
  return (
    <div>
      <Title
        title="User"
      />
    
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
