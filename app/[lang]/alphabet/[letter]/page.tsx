// app/[lang]/alphabet/[letter]/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";
import { useMemo } from "react";

interface Props {
  params: {
    lang: string;
    letter: string;
  };
}

export default function AlphabetPage({ params }: Props) {
  const { letter, lang } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const gender = searchParams.get("gender") || "";

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    router.push(`?${newParams.toString()}`);
  };

  const filtered = useMemo(() => {
    return mockNames.filter(
      (item: Name) =>
        item.alphabet.toLowerCase() === letter.toLowerCase() &&
        item.lang === lang &&
        (!gender || item.gender === gender)
    );
  }, [letter, lang, gender]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <AlphabetFilter lang={lang} selected={letter} />

      {/* Gender filter */}
      <div className="flex gap-4 mb-6 justify-center">
        {[
          { value: "", label: "Barchasi" },
          { value: "male", label: "Erkaklar" },
          { value: "female", label: "Ayollar" },
        ].map((g) => (
          <button
            key={g.value}
            onClick={() => updateQuery("gender", g.value)}
            className={`px-4 py-1 rounded border text-sm transition-all ${
              gender === g.value ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {filtered.length > 0 ? (
        <ul className="bg-gray-50 rounded-md shadow-sm border border-gray-200">
          {filtered.map((item) => (
            <SimpleNameItem
              key={item.id}
              id={item.id}
              name={item.name}
              lang={item.lang}
              gender={item.gender}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu filtrlarga mos ism topilmadi.</p>
      )}
    </main>
  );
}
