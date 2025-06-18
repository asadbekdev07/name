import Link from "next/link";

const categories = [
  { key: "arab", label: "Arab ismlari" },
  { key: "persian", label: "Fors ismlari" },
  { key: "turk", label: "Turk ismlari" },
];

export default function CategoryList({ lang }: { lang: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Turkumlar</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.key}>
            <Link
              href={`/${lang}/category/${cat.key}`}
              className="text-blue-600 hover:underline"
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
