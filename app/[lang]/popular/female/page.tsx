"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Name } from "@/types/name";
import NameCard from "@/components/NameCard";

interface Props {
  params: {
    lang: string;
  };
}

export default function PopularFemalePage({ params }: Props) {
  const { lang } = params;
  const [femaleNames, setFemaleNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopFemaleNames() {
      try {
        const namesRef = collection(db, "names");
        const q = query(
          namesRef,
          where("lang", "==", lang),
          where("gender", "==", "female"),
          orderBy("views", "desc"),
          limit(100)
        );
        const snapshot = await getDocs(q);
        const names: Name[] = snapshot.docs.map((doc) => ({
          ...(doc.data() as Name),
          id: doc.id,
        }));
        setFemaleNames(names);
      } catch (error) {
        console.error("Error fetching female names:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopFemaleNames();
  }, [lang]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">
        Eng ko‘p qidirilgan 100 ta ayollar ismlari
      </h1>

      {loading ? (
        <p className="text-gray-500">Yuklanmoqda...</p>
      ) : femaleNames.length > 0 ? (
        <div className="grid gap-4">
          {femaleNames.map((item) => (
            <NameCard
              key={item.id}
              id={item.id}
              name={item.name}
              meaning={item.meaning}
              lang={item.lang}
              likes={item.likes || 0}
              views={item.views || 0}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Hozircha mashhur ayol ismlar topilmadi.</p>
      )}
    </main>
  );
}
