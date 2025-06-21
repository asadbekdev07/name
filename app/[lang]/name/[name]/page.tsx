"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockNames } from "@/lib/mockNames";
import { mockFamousPeople } from "@/lib/mockFamousPeople";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryLabels } from "@/lib/categoryLabels";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";
import Comments from "@/components/Comments";

export default function NameDetailPage() {
  const params = useParams();
  const name = params?.name || "";
  const lang = params?.lang || "";

  const matched = mockNames.find(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.lang === lang
  );

  if (!matched) return notFound();

  // LocalStorage dan like holatini olish
  const [liked, setLiked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`liked_${matched.name.toLowerCase()}`) === "true";
    }
    return false;
  });

  // likes va views ning dastlabki qiymati null — loading ko‘rsatish uchun
  const [likes, setLikes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);

  const docRef = doc(db, "names", matched.name.toLowerCase());

  useEffect(() => {
    async function fetchData() {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLikes(data.likes ?? 0);
          setViews(data.views ?? 0);

          // Views ni oshirish Firestore-da
          await updateDoc(docRef, { views: increment(1) });
          setViews((v) => (v !== null ? v + 1 : 1));
        } else {
          // Hujjat mavjud bo‘lmasa yangi yaratish
          await setDoc(docRef, { likes: 0, views: 1 });
          setLikes(0);
          setViews(1);
        }
      } catch (error) {
        console.error("Firestore fetch error:", error);
        setLikes(0);
        setViews(0);
      }
    }
    fetchData();
  }, [matched.name]);

  // localStorage update qilish
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (liked) {
        localStorage.setItem(`liked_${matched.name.toLowerCase()}`, "true");
      } else {
        localStorage.removeItem(`liked_${matched.name.toLowerCase()}`);
      }
    }
  }, [liked, matched.name]);

  // Like tugmasi bosilganda
  const handleLikeToggle = async () => {
    try {
      if (liked) return; // faqat 1 marta bosish ruxsat — keyin o‘zgarmasligi uchun

      setLiked(true);
      setLikes((prev) => (prev !== null ? prev + 1 : 1));
      await updateDoc(docRef, { likes: increment(1) });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: matched.name,
        text: `Ism ma’nosi: ${matched.meaning}`,
        url: window.location.href,
      });
    } else {
      alert("Ulashish funksiyasi qo'llab-quvvatlanmaydi.");
    }
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(matched.name);
    utterance.lang = "uz-UZ";
    speechSynthesis.speak(utterance);
  };

  const similar = mockNames.filter(
    (item) =>
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      item.name.toLowerCase() !== name.toLowerCase() &&
      item.lang.toLowerCase() === lang.toLowerCase()
  );

  const famous = mockFamousPeople.filter(
    (person) =>
      person.relatedName.toLowerCase() === matched.name.toLowerCase() &&
      person.lang === lang
  );

  // Loading spinner ko‘rsatish
  if (likes === null || views === null) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-blue-800">{matched.name}</h1>
          <button
            onClick={handleSpeak}
            className="text-sm text-gray-500 hover:text-blue-500 transition"
            aria-label="Ismni eshitish"
          >
            🔊 Eshitish
          </button>
        </div>

        <div className="flex gap-4 text-sm text-gray-600 mb-6 items-center flex-wrap">
          <span
            className={matched.gender === "male" ? "text-blue-600" : "text-pink-600"}
          >
            {matched.gender === "male" ? "♂ Erkak ismi" : "♀ Ayol ismi"}
          </span>
          <span className="text-lg">👁 {views}</span>
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 text-lg cursor-pointer"
            aria-pressed={liked}
            aria-label={liked ? "Like o'chirish" : "Like berish"}
            disabled={liked} // bosilgan bo‘lsa, tugmani o‘chirish
          >
            <span className={liked ? "text-red-500" : "text-gray-400"}>
              {liked ? "❤️" : "🤍"}
            </span>
            <span>{likes}</span>
          </button>
          <button
            onClick={handleShare}
            className="text-blue-600 hover:underline text-sm"
          >
            📤 Ulashish
          </button>
        </div>

        <p className="text-lg text-gray-800 mb-4">
          <strong>Ma’nosi:</strong> {matched.meaning}
        </p>

        {matched.extraInfo && (
          <p className="text-sm text-gray-600 mb-6">
            <strong>Qo‘shimcha:</strong> {matched.extraInfo}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-8">
          <strong>Kelib chiqishi:</strong>{" "}
          <Link
            href={`/${lang}/category/${matched.category}`}
            className="text-blue-600 hover:underline"
          >
            {categoryLabels[matched.category] || matched.category}
          </Link>
        </p>

        {famous.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {matched.name} ismli mashhur insonlar
            </h2>
            <ul className="space-y-4">
              {famous.map((person) => (
                <li
                  key={person.id}
                  className="flex items-start gap-4 p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                    {person.name[0]}
                  </div>
                  <div className="flex-1">
                    <Link href={`/${lang}/person/${person.id}`}>
                      <h3 className="text-lg font-semibold text-blue-800 hover:underline">
                        {person.name}
                      </h3>
                    </Link>
                    <div className="flex gap-2 mt-2 flex-wrap text-xs">
                      {person.profession && (
                        <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-full text-gray-700">
                          {person.profession}
                        </span>
                      )}
                      {person.lifespan && (
                        <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-full text-gray-700">
                          {person.lifespan}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{person.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Shunga o‘xshash ismlar
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {similar.slice(0, 10).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/${lang}/name/${item.name.toLowerCase()}`}
                    className="block bg-blue-50 hover:bg-blue-100 text-center py-2 px-4 rounded-lg text-blue-700 font-medium transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fikrlar bo‘limi */}
        <Comments nameId={matched.name.toLowerCase()} />
      </div>
    </main>
  );
}
