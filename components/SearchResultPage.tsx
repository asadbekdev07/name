"use client"
// app/[lang]/search/[query]/page.tsx
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import NameCard from "@/components/NameCard";

interface Props {
  params: {
    lang: string;
    query: string;
  };
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Bu sahifa Server Component bo‘lishi kerak emas. Uni Client Component qilib yuboramiz:
"use client";
import { useParams } from "next/navigation";

export default function SearchResultPage() {
  const { lang, query } = useParams();

  if (!lang || !query) return null; // ehtiyot chorasi

  const filtered = mockNames.filter(
    (item: Name) =>
      item.name.toLowerCase().includes(String(query).toLowerCase()) &&
      item.lang === lang
  );

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-6 text-gray-700">
        Sizning so‘rovingiz «{capitalize(String(query))}» bo‘yicha topilgan natijalar soni:{" "}
        <span className="text-blue-700 font-bold">{filtered.length} ta</span>
      </h1>

      {filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <NameCard
              key={item.id}
              id={item.id}
              name={item.name}
              meaning={item.meaning}
              lang={item.lang}
              views={item.views || 0}
              likes={item.likes || 0}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Hech qanday ism topilmadi.</p>
      )}
    </main>
  );
}
