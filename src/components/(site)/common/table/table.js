"use client";
import React from "react";
import { Table as AntTable } from "antd";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import SearchInput from "../search";

const CommonTable = ({
  isSearch,
  columns,
  data,
  noActions,
  onView,
  onEdit,
  onDelete,
  loading,
  onPageChange,
  pagination,
  setSearch,
}) => {
  // 🟢 Add Index Column
  const indexColumn = {
    title: "SL",
    key: "index",
    render: (text, record, index) =>
      pagination
        ? (data?.page - 1) * (data?.limit || 10) + index + 1
        : index + 1,
  };

  let cols = noActions
    ? [indexColumn, ...columns]
    : [
        indexColumn,
        ...columns,
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <div className="flex justify-end gap-2">
              {onView && (
                <button
                  className="border cursor-pointer w-8 h-8 rounded-full border-orange-600 hover:border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 p-1 flex items-center justify-center"
                  title="View"
                  onClick={() => onView(record)}
                >
                  <FaEye size={20} />
                </button>
              )}

              {record.disableEdit === 1 &&
                !onView &&
                record.disableDelete === 1 &&
                "-"}

              {onEdit && record?.disableEdit !== 1 && (
                <button
                  className="border cursor-pointer w-8 h-8 border-orange-600 rounded-full hover:border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 p-1 flex items-center justify-center"
                  title="Edit"
                  onClick={() => onEdit(record)}
                >
                  <FaPencilAlt size={12} />
                </button>
              )}

              {onDelete && record?.disableDelete !== 1 && (
                <button
                  className="border cursor-pointer w-8 h-8 border-red-500 rounded-full hover:border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 flex items-center justify-center"
                  title="Delete"
                  onClick={() => onDelete(record)}
                >
                  <MdDeleteForever size={20} />
                </button>
              )}
            </div>
          ),
        },
      ];

  return (
    <div
      style={{ overflowX: "auto", width: "100%" }}
      className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6 sm:p-4 shadow-2xl"
    >
      {isSearch && <SearchInput onSearch={setSearch} />}
      <AntTable
        columns={cols}
        dataSource={pagination ? data?.docs : data}
        loading={loading}
        rowKey={(record) => record._id || record.id}
        pagination={
          pagination
            ? {
                current: data?.page || 1,
                pageSize: data?.limit || 10,
                total: data?.totalDocs || 0,
                onChange: (page, pageSize) => {
                  if (onPageChange) onPageChange(page, pageSize);
                },
              }
            : false
        }
      />
    </div>
  );
};

export default CommonTable;
