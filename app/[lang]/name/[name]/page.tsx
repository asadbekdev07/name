"use client";

import { useState } from "react";
import { mockNames } from "@/lib/mockNames";
import { mockFamousPeople } from "@/lib/mockFamousPeople";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryLabels } from "@/lib/categoryLabels";

interface Props {
  params: {
    lang: string;
    name: string;
  };
}

export default function NameDetailPage({ params }: Props) {
  const { name, lang } = params;

  const matched = mockNames.find(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.lang === lang
  );

  if (!matched) return notFound();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(matched.likes || 0);

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
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

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm">

        {/* Name + Eshitish */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-blue-800">{matched.name}</h1>
          <button
            onClick={handleSpeak}
            className="text-sm text-gray-500 hover:text-blue-500 transition"
          >
            🔊 Eshitish
          </button>
        </div>

        {/* Gender, Views, Likes, Share */}
        <div className="flex gap-4 text-sm text-gray-600 mb-6 items-center flex-wrap">
          <span className={matched.gender === "male" ? "text-blue-600" : "text-pink-600"}>
            {matched.gender === "male" ? "♂ Erkak ismi" : "♀ Ayol ismi"}
          </span>
          <span className="text-lg">👁 {matched.views || 0}</span>
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 text-lg cursor-pointer"
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

        {/* Meaning */}
        <p className="text-lg text-gray-800 mb-4">
          <strong>Ma’nosi:</strong> {matched.meaning}
        </p>

        {/* Extra info (optional) */}
        {matched.extraInfo && (
          <p className="text-sm text-gray-600 mb-6">
            <strong>Qo‘shimcha:</strong> {matched.extraInfo}
          </p>
        )}

        {/* Category as origin */}
        <p className="text-sm text-gray-500 mb-8">
          <strong>Kelib chiqishi:</strong>{" "}
          <Link
            href={`/${lang}/category/${matched.category}`}
            className="text-blue-600 hover:underline"
          >
            {categoryLabels[matched.category] || matched.category}
          </Link>
        </p>

        {/* Famous People — upgraded elegant style */}
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
          {/* Big user avatar */}
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
            {person.name[0]}
          </div>

          {/* Text content */}
          <div className="flex-1">
            <Link href={`/${lang}/person/${person.id}`}>
              <h3 className="text-lg font-semibold text-blue-800 hover:underline">
                {person.name}
              </h3>
            </Link>

            {/* Profession + lifespan as styled badges */}
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

            {/* Description */}
            <p className="text-sm text-gray-700 mt-2">{person.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}




        {/* Similar names */}
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

        {/* Comments placeholder */}
        <div className="mt-12 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Fikrlar</h3>
          <p className="text-sm text-gray-500">
            Bu yerga foydalanuvchi fikrlarini yozish imkoniyati keyinchalik qo‘shiladi.
          </p>
        </div>
      </div>
    </main>
  );
}
