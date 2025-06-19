"use client";

import Link from "next/link";

const categories = [
  { key: "arab", label: "Arab ismlari", count: 256 },
  { key: "persian", label: "Fors ismlari", count: 143 },
  { key: "turk", label: "Turk ismlari", count: 98 },
  { key: "kazakh", label: "Qozoq ismlari", count: 87 },
  { key: "kyrgyz", label: "Qirg‘iz ismlari", count: 54 },
  { key: "uzbek", label: "O‘zbek ismlari", count: 132 },
];

export default function CategoryList({ lang }: { lang: string }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-800">Turkumlar</h2>

      <ul className="grid gap-2">
        {categories.slice(0, 6).map((cat) => (
          <li
            key={cat.key}
            className="flex justify-between items-center px-4 py-3 rounded-lg bg-gray-50 hover:bg-blue-100 transition shadow-sm"
          >
            <Link
              href={`/${lang}/category/${cat.key}`}
              className="text-base text-blue-800 font-medium hover:underline"
            >
              {cat.label}
            </Link>
            <span className="text-sm text-gray-600">{cat.count} ta ism</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 text-right">
        <Link
          href={`/${lang}/categories`}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          Barcha turkumlarni ko‘rish →
        </Link>
      </div>
    </section>
  );
}
