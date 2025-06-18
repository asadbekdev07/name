"use client"
import { mockNames } from "@/lib/mockNames";
import AlphabetFilter from "@/components/AlphabetFilter";
import { notFound } from "next/navigation";

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

  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* ALPHABET FILTER always visible on top */}
      <div className="mb-8">
        <AlphabetFilter
          selected=""
          onSelect={() => {}}
          lang={lang}
        />
      </div>

      <h1 className="text-3xl font-bold text-blue-700 mb-3">
        {matched.name}
      </h1>
      <p className="text-gray-700 text-lg mb-2">
        <strong>Ma’nosi:</strong> {matched.meaning}
      </p>
      <p className="text-gray-500 text-sm">
        <strong>Jinsi:</strong> {matched.gender} | <strong>Kategoriya:</strong> {matched.category}
      </p>
    </main>
  );
}
