"use client";
import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string; // example: /uz/alphabet/a
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
