"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Name } from "@/types/name";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PopularMalePage() {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularMaleNames() {
      try {
        const q = query(
          collection(db, "names"),
          where("gender", "==", "male"),
          orderBy("views", "desc"),
          limit(100)
        );
        const querySnapshot = await getDocs(q);
        const result: Name[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          result.push({ id: doc.id, ...data } as Name);
        });
        setNames(result);
        console.log('Male docs raw:', maleSnap.docs.map(d => d.data()));
        

      } catch (error) {
        console.error("Error fetching popular male names:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMaleNames();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Eng ko‘p ko‘rilgan erkak ismlar
      </h1>
      <ul className="space-y-3">
        {names.map((name) => (
          <li
            key={name.id}
            className="flex justify-between items-center px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
          >
            <Link
              href={`/${name.lang}/name/${name.name.toLowerCase()}`}
              className="text-blue-800 font-medium"
            >
              ♂ {name.name}
            </Link>
            <span className="text-sm text-gray-600">{name.views ?? 0} marta</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
