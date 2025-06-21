"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockNames } from "@/lib/mockNames";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import NameCard from "@/components/NameCard";
import { Name } from "@/types/name";

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

type NameWithStats = Name & { likes: number; views: number };

export default function SearchResultPage() {
  const { lang, query } = useParams();
  const [results, setResults] = useState<NameWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lang || !query) return;

    const filtered = mockNames.filter(
      (item: Name) =>
        item.name.toLowerCase().includes(String(query).toLowerCase()) &&
        item.lang === lang
    );

    Promise.all(
      filtered.map(async (item) => {
        const docRef = doc(db, "names", item.name.toLowerCase()); // 🔧 fixed: removed `${lang}_`
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists() ? docSnap.data() : {};
        return {
          ...item,
          likes: data.likes || 0,
          views: data.views || 0,
        };
      })
    ).then((enriched) => {
      setResults(enriched);
      setLoading(false);
    });
  }, [lang, query]);

  if (!lang || !query) return null;

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-6 text-gray-700">
        Sizning so‘rovingiz «{capitalize(String(query))}» bo‘yicha topilgan natijalar soni:{" "}
        <span className="text-blue-700 font-bold">{results.length} ta</span>
      </h1>

      {loading ? (
        <p className="text-gray-400">Yuklanmoqda...</p>
      ) : results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((item) => (
            <NameCard
              key={item.id}
              id={item.id}
              name={item.name}
              meaning={item.meaning}
              lang={item.lang}
              views={item.views}
              likes={item.likes}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Hech qanday ism topilmadi.</p>
      )}
    </main>
  );
}
