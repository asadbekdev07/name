"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import NameCard from "@/components/NameCard";
import { Name } from "@/types/name";

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default function SearchResultPage() {
  const { lang, query } = useParams();
  const [results, setResults] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lang || !query) return;

    async function fetchNames() {
      setLoading(true);
      try {
        const namesRef = collection(db, "names");

        // Search: name starts with or contains the query (case-insensitive)
        const snapshot = await getDocs(
          firestoreQuery(namesRef, where("lang", "==", lang))
        );

        const filtered: Name[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Name;
          if (
            data.name.toLowerCase().includes(String(query).toLowerCase())
          ) {
            filtered.push({ ...data, id: doc.id });
          }
        });

        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNames();
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
