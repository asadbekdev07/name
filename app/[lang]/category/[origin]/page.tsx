"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";

interface Props {
  params: {
    lang: string;
    origin: string;
  };
}

const ITEMS_PER_PAGE = 20;

// Mapping origin to readable labels
const originLabels: Record<string, string> = {
  arab: "Arabcha",
  persian: "Fors-tojikcha",
  turk: "Turkcha",
  russian: "Ruscha",
  english: "Inglizcha",
  uzbek: "O‘zbekcha",
  // kerak bo‘lsa boshqa tillarni ham qo‘shing
};

export default function CategoryPage({ params }: Props) {
  const { lang, origin } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const gender = searchParams.get("gender") || "";
  const letter = searchParams.get("letter") || "";
  const pageParam = searchParams.get("page") || "1";
  const pageNumber = parseInt(pageParam);

  const filtered = useMemo(() => {
    return mockNames.filter(
      (item: Name) =>
        item.category === origin &&
        item.lang === lang &&
        (!gender || item.gender === gender) &&
        (!letter || item.alphabet.toLowerCase() === letter.toLowerCase())
    );
  }, [lang, origin, gender, letter]);

  const paginated = filtered.slice(
    (pageNumber - 1) * ITEMS_PER_PAGE,
    pageNumber * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* ALPHABET FILTER */}
      <AlphabetFilter
        lang={lang}
        selected={letter}
        onSelect={(ltr) => updateQuery("letter", ltr)}
      />

      {/* GENDER FILTER */}
      <div className="flex gap-4 mb-6 justify-center">
        {[
          { value: "", label: "Barchasi" },
          { value: "male", label: "Erkaklar" },
          { value: "female", label: "Ayollar" },
        ].map((g) => (
          <button
            key={g.value}
            onClick={() => updateQuery("gender", g.value)}
            className={`px-4 py-1 rounded border text-sm transition-all ${
              gender === g.value ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* NATIJA MIQDORI HEADER */}
      <h1 className="text-lg font-semibold mb-6 text-gray-700">
        Sizning so‘rovingiz „{originLabels[origin] || origin}“ ismlar turkumida topilgan natijalar soni:{" "}
        <span className="text-blue-700 font-bold">{filtered.length} ta</span>
      </h1>

      {/* ISMLAR */}
      {paginated.length > 0 ? (
        <ul className="bg-gray-50 rounded-md shadow-sm border border-gray-200">
          {paginated.map((item) => (
            <SimpleNameItem
              key={item.id}
              name={item.name}
              lang={item.lang}
              gender={item.gender}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu filtrlarga mos ism topilmadi.</p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", (i + 1).toString());
            return (
              <a
                key={i}
                href={`?${newParams.toString()}`}
                className={`px-3 py-1 border rounded ${
                  i + 1 === pageNumber
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
