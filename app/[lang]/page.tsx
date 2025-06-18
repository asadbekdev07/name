"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/components/SearchInput";
import AlphabetFilter from "@/components/AlphabetFilter";
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";

interface Props {
  params: {
    lang: string;
  };
}

export default function LangHomePage({ params }: Props) {
  const lang = params.lang;
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const filteredNames = useMemo(() => {
    return mockNames.filter((item: Name) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLetter = selectedLetter
        ? item.alphabet.toLowerCase() === selectedLetter.toLowerCase()
        : true;

      return matchesSearch && matchesLetter;
    });
  }, [search, selectedLetter]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* HERO */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 mb-3">
          Ismlar Ma’nosi
        </h1>
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
        <AlphabetFilter selected={selectedLetter} onSelect={setSelectedLetter} lang={lang} />
      </div>
    </main>
  );
}
