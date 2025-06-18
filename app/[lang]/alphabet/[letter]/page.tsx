// AT TOP
"use client"; // bu faqat kerakli joyda, ya'ni `AlphabetPage`da

import { mockNames } from "@/lib/mockNames";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";

export default function AlphabetPage() {
  const params = useParams();
  const lang = params.lang as string;
  const letter = params.letter as string;

  const [filtered, setFiltered] = useState<Name[]>([]);

  useEffect(() => {
    const result = mockNames.filter(
      (item) =>
        item.alphabet.toLowerCase() === letter.toLowerCase() &&
        item.lang === lang
    );
    setFiltered(result);
  }, [lang, letter]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {/* AlphabetFilter client component — no problem now */}
      <div className="mb-6">
        <AlphabetFilter
          selected={letter.toUpperCase()}
          onSelect={() => {}}
          lang={lang}
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="border rounded p-3 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <strong>{item.name}</strong> — {item.meaning}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu harfga oid ism topilmadi.</p>
      )}
    </main>
  );
}
