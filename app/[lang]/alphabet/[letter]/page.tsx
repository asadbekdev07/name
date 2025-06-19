"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";
import { useMemo } from "react";

interface Props {
  params: {
    lang: string;
    letter: string;
  };
}

const ITEMS_PER_PAGE = 20;

export default function AlphabetPage({ params }: Props) {
  const { letter, lang } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const gender = searchParams.get("gender") || "";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam);

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    // Reset page to 1 when changing filter
    if (key !== "page") newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  const filtered = useMemo(() => {
    return mockNames.filter(
      (item: Name) =>
        item.alphabet.toLowerCase() === letter.toLowerCase() &&
        item.lang === lang &&
        (!gender || item.gender === gender)
    );
  }, [letter, lang, gender]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <AlphabetFilter lang={lang} selected={letter} />

      {/* Gender filter */}
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

      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {/* Results */}
      {paginated.length > 0 ? (
        <ul className="bg-gray-50 rounded-md shadow-sm border border-gray-200">
          {paginated.map((item) => (
            <SimpleNameItem
              key={item.id}
              id={item.id}
              name={item.name}
              lang={item.lang}
              gender={item.gender}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu filtrlarga mos ism topilmadi.</p>
      )}

      {/* Pagination */}
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
                  i + 1 === currentPage
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
