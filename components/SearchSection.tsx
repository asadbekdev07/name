"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim().length > 1) {
      router.push(`/search/${search.toLowerCase()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Ism qidiring..."
        className="p-2 px-4 border border-gray-300 rounded-full shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
      >
        Qidirish
      </button>
    </form>
  );
}
