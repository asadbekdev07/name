"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function HeaderSearchWrapper() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { lang } = useParams();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/${lang}/search/${search.trim().toLowerCase()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Ism qidirish..."
      className="px-3 py-2 border rounded-md w-full max-w-xs"
    />
  );
}
