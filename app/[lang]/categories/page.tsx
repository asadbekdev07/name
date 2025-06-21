// app/[lang]/categories/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryLabels } from "@/lib/categoryLabels";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Name } from "@/types/name";

interface Props {
  params: {
    lang: string;
  };
}

export default function CategoriesPage({ params }: Props) {
  const { lang } = params;
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const namesRef = collection(db, "names");
        const q = query(namesRef, where("lang", "==", lang));
        const snapshot = await getDocs(q);

        const counts: Record<string, number> = {};

        snapshot.forEach((doc) => {
          const data = doc.data() as Name;
          if (data.category) {
            counts[data.category] = (counts[data.category] || 0) + 1;
          }
        });

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Kategoriya maʼlumotlarini olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [lang]);

  if (loading) {
    return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Barcha turkumlar</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categoryLabels).map(([key, label]) => {
          const count = categoryCounts[key] || 0;

          return (
            <Link
              key={key}
              href={`/${lang}/category/${key}`}
              className="block bg-blue-50 p-4 rounded shadow hover:bg-blue-100 transition"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-1">{label}</h2>
              <p className="text-sm text-gray-600 mb-1">{count} ta ism</p>
              <p className="text-sm text-blue-600 font-medium">→ Ismlarni ko‘rish</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
