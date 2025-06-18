"use client"
import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";

interface Props {
  params: {
    lang: string;
    letter: string;
  };
}

export default function AlphabetPage({ params }: Props) {
  const { letter, lang } = params;

  const filtered = mockNames.filter(
    (item: Name) =>
      item.alphabet.toLowerCase() === letter.toLowerCase() &&
      item.lang === lang
  );

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* ✅ ALIFBO FILTRI HEADERDAN KEYIN KO'RINSIN */}
      <div className="mb-6">
        <AlphabetFilter selected={letter.toUpperCase()} onSelect={() => {}} lang={lang} />
      </div>

      {/* Sarlavha */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {/* Ism ro'yxati */}
      {filtered.length > 0 ? (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="border rounded p-3 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <strong>{item.name}</strong> — {item.meaning}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu harfga oid ism topilmadi.</p>
      )}
    </main>
  );
}
