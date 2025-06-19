"use client";

import { mockNames } from "@/lib/mockNames";
import AlphabetFilter from "@/components/AlphabetFilter";
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

  const similar = mockNames.filter(
    (item) =>
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      item.name.toLowerCase() !== name.toLowerCase() &&
      item.lang === lang
  );

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* ALPHABET FILTER always visible on top */}
      <div className="mb-8">
        <AlphabetFilter selected="" onSelect={() => {}} lang={lang} />
      </div>

      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        {matched.name}
      </h1>

      {/* Gender + Views + Likes */}
      <p className="text-gray-600 text-sm mb-2 flex gap-2 items-center">
        <span className={matched.gender === "male" ? "text-blue-600" : "text-pink-600"}>
          {matched.gender === "male" ? "♂ Erkak ismi" : "♀ Ayol ismi"}
        </span>
        <span>👁 {matched.views || 0} marta ko‘rilgan</span>
        <span>❤️ {matched.likes || 0} ta yoqtirish</span>
      </p>

      {/* Meaning */}
      <p className="text-gray-800 text-lg mb-4">
        <strong>Ma’nosi:</strong> {matched.meaning}
      </p>

      {/* Category with link */}
      <p className="text-gray-500 text-sm mb-6">
        <strong>Turkum:</strong>{" "}
        <Link
          href={`/${lang}/category/${matched.category}`}
          className="text-blue-600 hover:underline"
        >
          {categoryLabels[matched.category] || matched.category}
        </Link>
      </p>

      {/* Similar names */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Shunga o‘xshash ismlar
          </h2>
          <ul className="grid gap-2">
            {similar.slice(0, 10).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/${lang}/name/${item.name.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
