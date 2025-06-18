"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import SearchInput from "./SearchInput";

export default function HeaderSearchWrapper() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams(); // "uz", "ru" va h.k.

  // Sahifa o'zgarganda inputni tozalash
  useEffect(() => {
    setSearch("");
  }, [pathname]);

  const handleSubmit = () => {
    if (search.trim()) {
      router.push(`/${lang}/search/${search.trim().toLowerCase()}`);
    }
  };

  return (
    <SearchInput
      search={search}
      onSearchChange={setSearch}
      onSubmit={handleSubmit}
    />
  );
}
