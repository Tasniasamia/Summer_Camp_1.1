"use client";
import React from "react";
import { Pagination as AntdPagination } from "antd";

export default function Pagination({
  currentPage,
  totalItems,
  onPageChange,
  limit = 10,
  pageSizeOptions=false, // null হলে dropdown দেখাবে না
}) {
  return (
    <div className="flex justify-center mt-4">
      <AntdPagination
        current={currentPage}
        pageSize={limit}
        total={totalItems}
        onChange={onPageChange}
        showSizeChanger={!!pageSizeOptions} // true হলে dropdown দেখাবে
        pageSizeOptions={pageSizeOptions ? ["10", "20", "50"] : null}
      />
    </div>
  );
}
