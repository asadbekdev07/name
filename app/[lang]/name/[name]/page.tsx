"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";
import Comments from "@/components/Comments";
import { categoryLabels } from "@/lib/categoryLabels";

export default function NameDetailPage() {
  const params = useParams();
  const name = params?.name || "";
  const lang = params?.lang || "";

  const [matched, setMatched] = useState<any>(null);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);

  const docRef = doc(db, "names", name.toLowerCase());

  // 🔍 Ismni Firestore'dan olish
  useEffect(() => {
    async function fetchData() {
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMatched({ id: docSnap.id, ...data });

          // Viewsni oshirish
          const updatedViews = (data.views ?? 0) + 1;
          await updateDoc(docRef, { views: increment(1) });

          // Local holatni yangilash
          setLikes(data.likes ?? 0);
          setViews(updatedViews);

          // LocalStorage'dan like holati
          if (typeof window !== "undefined") {
            const isLiked = localStorage.getItem(`liked_${name.toLowerCase()}`) === "true";
            setLiked(isLiked);
          }
        } else {
          // Hujjat mavjud emas
          await setDoc(docRef, {
            name,
            lang,
            likes: 0,
            views: 1,
            gender: "",
            meaning: "",
            category: "",
            extraInfo: "",
          });
          setMatched({ name, lang, likes: 0, views: 1 });
          setLikes(0);
          setViews(1);
        }
      } catch (error) {
        console.error("Firestore error:", error);
        setNotFoundFlag(true);
      }
    }

    if (name && lang) fetchData();
  }, [name, lang]);

  // ❌ Topilmasa
  if (notFoundFlag) return notFound();

  // ❤️ Like tugmasi
  const handleLikeToggle = async () => {
    try {
      const change = liked ? -1 : 1;
      setLiked(!liked);
      setLikes((prev) => (prev !== null ? prev + change : change));
      await updateDoc(docRef, { likes: increment(change) });

      if (typeof window !== "undefined") {
        if (!liked) {
          localStorage.setItem(`liked_${name.toLowerCase()}`, "true");
        } else {
          localStorage.removeItem(`liked_${name.toLowerCase()}`);
        }
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  // 📤 Ulashish
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: matched.name,
        text: `Ism ma’nosi: ${matched.meaning}`,
        url: window.location.href,
      });
    } else {
      alert("Ulashish funksiyasi mavjud emas.");
    }
  };

  // 🔊 Eshitish
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(matched.name);
    utterance.lang = "uz-UZ";
    speechSynthesis.speak(utterance);
  };

  if (!matched || likes === null || views === null) {
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
          <span className={matched.gender === "male" ? "text-blue-600" : "text-pink-600"}>
            {matched.gender === "male" ? "♂ Erkak ismi" : "♀ Ayol ismi"}
          </span>
          <span className="text-lg">👁 {views}</span>
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 text-lg cursor-pointer"
            aria-pressed={liked}
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

        {/* Fikrlar bo‘limi */}
        <Comments nameId={matched.name.toLowerCase()} />
      </div>
    </main>
  );
}
