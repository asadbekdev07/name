"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import SearchInput from "./SearchInput";

export default function Header() {
  const { lang } = useParams();

  return (
    <header className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 shadow-sm border-b bg-white sticky top-0 z-10">
      {/* Chap tomon: Home tugmasi */}
      <Link
        href={`/${lang}`}
        className="text-blue-600 font-bold text-lg flex items-center gap-1 whitespace-nowrap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l9-9 9 9m-2 0v8a2 2 0 01-2 2h-2m-4 0H7a2 2 0 01-2-2v-8m0 0L3 12"
          />
        </svg>
        Bosh sahifa
      </Link>

      {/* O'ng tomon: Search input */}
      <div className="w-full sm:max-w-xs">
        <SearchInput />
      </div>
    </header>
  );
}
