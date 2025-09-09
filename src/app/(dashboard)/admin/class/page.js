"use client";
import DashboardTable from "@/components/(dashboard)/common/table/table";
import CommonTable from "@/components/(site)/common/table/table";
import Title from "@/components/(site)/common/title";
import { getAllClass } from "@/helpers/utils/api";
import { useFetch } from "@/helpers/utils/hooks";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  // const deleteClass=useMutationAction('delete',`/class`,'deleteClass');
  const {
    data: getClass,
    isLoading: loadingClasses,
    error: errClasses,
  } = useFetch("class", getAllClass, { page:page, limit:10, search:search });

  const {
    data: users,
    isLoading: loadingUsers,
    error: errUsers,
  } = useFetch("user", "/getUsers");


  const columns = [
    {title:"Image",dataIndex:"image",key:"image",render:(_,d)=>{
      console.log("d",d);
      return (
        <Image src={d?.image?.secure_url || '/download.png'}  className="h-6 w-auto object-fill " width={1000} height={1000}/>
      )
    }},
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Instructor",
      dataIndex: "instructorId",
      key: "instructor",
      render: (_, record) => {
        const instructor = users?.find((u) => u.id === record.instructorId);
        return (
          <span className="line-clamp-1" title={instructor?.description}>
            {instructor?.name || "N/A"}
          </span>
        );
      },
    },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (_, d) => {
        return <span>{dayjs(d?.time).format("HH:mm:ss")}</span>;
      },
    },
    { title: "Place", dataIndex: "place", key: "place" },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createdAt",
      render: (_, d) => {
        return <span>{dayjs(d?.createdAt).format("YYYY-MMM-DD")}</span>;
      },
    },
    { title: "Seats", dataIndex: "sit", key: "sit" },
    { title: "Enrollment", dataIndex: "enrollment", key: "enrollment" },
  ];

  // Pagination handler
  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return (
    <div>
      <Title
        title="Class"
        noBack={false}
        customComponent={
          <button
            type="button"
            onClick={() => router.push("/admin/class/add")}
            className="px-4 cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base"
          >
            Add New Class
          </button>
        }
      />
      <DashboardTable/>
      {/* <CommonTable
        columns={columns}
        isSearch={true}
        data={getClass?.data?.data?.docs}
        loading={loadingClasses || loadingUsers}
        onView={(rec) => router.push(`/admin/class/${rec?.id}`)}
        onEdit={(rec) => router.push(`/admin/class/edit/${rec?.id}`)}
        onDelete={async(rec) =>{
        //  deleteClass.mutateAsync({id:rec?.id});

        } }
        // pagination={true}
        // onPageChange={handlePageChange}
        setSearch={setSearch}
      /> */}
      
    </div>
  );
};

export default Page;
