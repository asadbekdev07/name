"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import AlphabetFilter from "@/components/AlphabetFilter";

export default function LangHomePage() {
  const params = useParams();
  const lang = params.lang as string;
  const [search, setSearch] = useState("");

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* HERO */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-3">Ismlar Ma’nosi</h1>
        <p className="text-gray-600 text-lg">
          Farzandingiz uchun eng chiroyli va mazmunli ismni toping
        </p>
      </section>

      {/* SEARCH */}
      <div className="mb-6">
        <SearchInput search={search} onSearchChange={setSearch} />
      </div>

      {/* ALPHABET FILTER */}
      <div className="mb-10">
        <AlphabetFilter selected="" onSelect={() => {}} lang={lang} />
      </div>
    </main>
  );
}
