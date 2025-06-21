"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import AlphabetFilter from "@/components/AlphabetFilter";
import TopSearchedNames from "@/components/TopSearchedNames";
import CategoryList from "@/components/CategoryList";

export default function LangHomePage() {
  const params = useParams();
  const lang = params.lang as string;
  const [search, setSearch] = useState("");

  // 🔥 Statik eng ko‘p qidirilgan ismlar (hozircha frontenddan)
  const topFemaleNames = [
    { id: "1", name: "Laylo", gender: "female", lang },
    { id: "2", name: "Shirin", gender: "female", lang },
    { id: "3", name: "Zaynab", gender: "female", lang },
    { id: "4", name: "Mohira", gender: "female", lang },
    { id: "5", name: "Anora", gender: "female", lang },
  ];

  const topMaleNames = [
    { id: "6", name: "Ali", gender: "male", lang },
    { id: "7", name: "Elyor", gender: "male", lang },
    { id: "8", name: "Umar", gender: "male", lang },
    { id: "9", name: "Anvar", gender: "male", lang },
    { id: "10", name: "Asadbek", gender: "male", lang },
  ];

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-3">
          Ismlar Ma’nosi
        </h1>
        <p className="text-gray-600 text-lg">
          Farzandingiz uchun eng chiroyli va mazmunli ismni toping
        </p>
      </section>

      {/* Search */}
      <div className="mb-6">
        <SearchInput search={search} onSearchChange={setSearch} />
      </div>

      {/* Alphabet Filter */}
      <div className="mb-10">
        <AlphabetFilter selected="" onSelect={() => {}} lang={lang} />
      </div>

      {/* Most searched names */}
      <div className="space-y-12">
        <TopSearchedNames lang={lang} />
      </div>

      <CategoryList lang={lang} />

    </main>
  );
}
