"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "antd";

export default function PaginationWrapper({
  currentPage,
  totalCount,
  defaultPageSize,
  keyword,
}) {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/archive?page=${page}${keyword ? `&keyword=${keyword}` : ""}`);
  };

  return (
    <Pagination
      style={{ direction: "ltr" }}
      current={currentPage}
      total={totalCount}
      onChange={handlePageChange}
      pageSizeOptions={[defaultPageSize]}
      defaultPageSize={defaultPageSize}
    />
  );
}
