// app/[lang]/categories/page.tsx

import Link from "next/link";
import { mockNames } from "@/lib/mockNames";
import { categoryLabels } from "@/lib/categoryLabels";
import { Name } from "@/types/name";

interface Props {
  params: {
    lang: string;
  };
}

export default function CategoriesPage({ params }: Props) {
  const { lang } = params;

  // Har bir kategoriya uchun ism sonini hisoblash
  const categoryCounts: Record<string, number> = {};

  mockNames.forEach((item: Name) => {
    if (item.lang === lang) {
      if (!categoryCounts[item.category]) {
        categoryCounts[item.category] = 1;
      } else {
        categoryCounts[item.category]++;
      }
    }
  });

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Barcha turkumlar</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(categoryLabels).map(([key, label]) => {
          const count = categoryCounts[key] || 0;

          return (
            <Link
              key={key}
              href={`/${lang}/category/${key}`}
              className="block bg-blue-50 p-4 rounded shadow hover:bg-blue-100 transition"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-1">{label}</h2>
              <p className="text-sm text-gray-600 mb-1">{count} ta ism</p>
              <p className="text-sm text-blue-600 font-medium">→ Ismlarni ko‘rish</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
