"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Name } from "@/types/name";

interface Props {
  lang: string;
}

export default function TopSearchedNames({ lang }: Props) {
  const [maleNames, setMaleNames] = useState<Name[]>([]);
  const [femaleNames, setFemaleNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log("Keldi lang:", lang); // <-- BU YER MUHIM

  if (!lang) {
    console.warn("⚠️ lang qiymati undefined!");
    return;
  }

  async function fetchTopNames() {
    console.log("🔍 fetchTopNames boshlanyapti...");

    try {
      const namesRef = collection(db, "names");

      // Erkaklar
      const maleQuery = query(
        namesRef,
        where("lang", "==", lang),
        where("gender", "==", "male"),
        orderBy("views", "desc"),
        limit(5)
      );
      const maleSnap = await getDocs(maleQuery);
      console.log("👨 Erkaklar", maleSnap.docs.map((d) => d.data()));

      const topMales: Name[] = maleSnap.docs.map((doc) => ({
        ...(doc.data() as Name),
        id: doc.id,
      }));

      // Ayollar
      const femaleQuery = query(
        namesRef,
        where("lang", "==", lang),
        where("gender", "==", "female"),
        orderBy("views", "desc"),
        limit(5)
      );
      const femaleSnap = await getDocs(femaleQuery);
      console.log("👩 Ayollar", femaleSnap.docs.map((d) => d.data()));

      const topFemales: Name[] = femaleSnap.docs.map((doc) => ({
        ...(doc.data() as Name),
        id: doc.id,
      }));

      setMaleNames(topMales);
      setFemaleNames(topFemales);
      setLoading(false);
    } catch (error) {
      console.error("❌ Xatolik:", error);
    }
  }

  fetchTopNames();
}, [lang]);


  if (loading) {
    return <p className="text-center text-gray-500">Yuklanmoqda...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      {/* Erkaklar ismlari */}
      <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Eng ko‘p qidirilgan erkaklar ismlari
        </h2>
        <ul className="space-y-2 flex-grow">
          {maleNames.map((name) => (
            <li
              key={name.id}
              className="flex justify-between items-center px-2 py-2 hover:bg-blue-100 rounded transition"
            >
              <Link
                href={`/${name.lang}/name/${name.name.toLowerCase()}`}
                className="text-blue-800 font-medium"
              >
                ♂ {name.name}
              </Link>
              <span className="text-sm text-gray-600">
                {name.views ?? 0} marta
              </span>
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/popular/male`} className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
            Batafsil
          </button>
        </Link>
      </div>

      {/* Ayollar ismlari */}
      <div className="bg-pink-50 rounded-lg shadow p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-pink-700 mb-4">
          Eng ko‘p qidirilgan ayollar ismlari
        </h2>
        <ul className="space-y-2 flex-grow">
          {femaleNames.map((name) => (
            <li
              key={name.id}
              className="flex justify-between items-center px-2 py-2 hover:bg-pink-100 rounded transition"
            >
              <Link
                href={`/${name.lang}/name/${name.name.toLowerCase()}`}
                className="text-pink-800 font-medium"
              >
                ♀ {name.name}
              </Link>
              <span className="text-sm text-gray-600">
                {name.views ?? 0} marta
              </span>
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/popular/female`} className="mt-4">
          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition">
            Batafsil
          </button>
        </Link>
      </div>
    </div>
  );
}
