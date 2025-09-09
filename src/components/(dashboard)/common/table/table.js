import { getAllClass, getAllUser } from "@/helpers/utils/api";
import { useFetch } from "@/helpers/utils/hooks";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import {
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaAngleDoubleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { MdImage, MdSchool, MdStarRate, MdEventSeat } from "react-icons/md";
import SearchInput from "../form/search";

const DashboardTable = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const {
    data: classes,
    isLoading,
    iserror,
    refetch,
  } = useFetch("class", getAllClass);
  const {
    data: users,
    isLoading: loading,
    iserror: error,
    refetch: isrefetch,
  } = useFetch("user", getAllUser);
  const data = classes?.data?.data?.docs;
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("image", {
      header: () => (
        <span className="flex items-center">
          <MdImage className="mr-2" size={16} /> Image
        </span>
      ),
      cell: (info) => {
        const d = info.row.original;
        return (
          <Image
            src={d?.image?.secure_url || "/download.png"}
            className="h-8 w-8 object-cover mx-auto"
            width={100}
            height={100}
            alt="course-img"
          />
        );
      },
    }),

    columnHelper.accessor("name", {
      header: () => (
        <span className="flex items-center">
          <FaUser className="mr-2" size={16} /> Name
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("instructorId", {
      header: () => (
        <span className="flex items-center">
          <MdSchool className="mr-2" size={16} /> Instructor
        </span>
      ),
      cell: (info) => {
        const record = info.row.original;
        const instructor = users?.find((u) => u.id === record.instructorId);
        return (
          <span className="line-clamp-1" title={instructor?.description}>
            {instructor?.name || "N/A"}
          </span>
        );
      },
    }),

    columnHelper.accessor("rate", {
      header: () => (
        <span className="flex items-center">
          <MdStarRate className="mr-2" size={16} /> Rate
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("duration", {
      header: () => (
        <span className="flex items-center">
          <FaClock className="mr-2" size={16} /> Duration
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("time", {
      header: () => (
        <span className="flex items-center">
          <FaClock className="mr-2" size={16} /> Time
        </span>
      ),
      cell: (info) => {
        const d = info.row.original;
        return <span>{dayjs(d?.time).format("HH:mm:ss")}</span>;
      },
    }),

    columnHelper.accessor("place", {
      header: () => (
        <span className="flex items-center">
          <FaMapMarkerAlt className="mr-2" size={16} /> Place
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    // columnHelper.accessor("createDate", {
    //   header: () => (
    //     <span className="flex items-center">
    //       <FaCalendarAlt className="mr-2" size={16} /> Create Date
    //     </span>
    //   ),
    //   cell: (info) => {
    //     const d = info.row.original;
    //     return <span>{dayjs(d?.createdAt).format("YYYY-MMM-DD")}</span>;
    //   },
    // }),

    columnHelper.accessor("sit", {
      header: () => (
        <span className="flex items-center">
          <MdEventSeat className="mr-2" size={16} /> Seats
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    // columnHelper.accessor("enrollment", {
    //   header: () => (
    //     <span className="flex items-center">
    //       <FaUsers className="mr-2" size={16} /> Enrollment
    //     </span>
    //   ),
    //   cell: (info) => info.getValue(),
    // }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log("getRow", table?.getRowModel());

  return (
    <div className="flex flex-col min-h-screen  mx-auto  ">
      <SearchInput setGlobalFilter={setGlobalFilter} />
      <div className="overflow-x-auto bg-white  rounded-t-3xllg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headersGroup, index) => {
              return (
                <tr key={index}>
                  {headersGroup?.headers?.map((header, index2) => {
                    return (
                      <th
                        key={index2}
                        className="px-6 py-3 cursor-pointer text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="min-w-full divide-y divide-gray-200">
            {table?.getRowModel().rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 duration-300">
                {row?.getVisibleCells()?.map((cell, index2) => {
                  return (
                    <td
                      key={index2}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-4 py-4 bg-white border-t border-gray-50">
  {/* Items per page */}
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <span>Items per page:</span>
    <select
      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-200"
      onChange={(e) => table.setPageSize(Number(e.target.value))}
      value={table.getState().pagination.pageSize}
    >
      {[5, 10, 20, 30].map((pageSize, index) => (
        <option key={index} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  </div>

  {/* Pagination Controls */}
  <div className="flex items-center gap-2">
    <button
      onClick={() => table.setPageIndex(0)}
      disabled={!table.getCanPreviousPage()}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <FaAngleDoubleLeft size={14} />
    </button>
    <button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <FaChevronLeft size={14} />
    </button>

    <div className="flex items-center gap-1 text-sm text-gray-600">
      <input
        type="number"
        min={1}
        max={table.getPageCount()}
        value={table.getState().pagination.pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
        }}
        className="w-12 border rounded text-center text-sm px-1 py-1"
      />
      <span>of {table.getPageCount()}</span>
    </div>

    <button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <FaChevronRight size={14} />
    </button>
    <button
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      disabled={!table.getCanNextPage()}
      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
    >
      <FaAngleDoubleRight size={14} />
    </button>
  </div>
</div>

    </div>
  );
};

export default DashboardTable;
