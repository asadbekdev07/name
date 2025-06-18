import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import NameCard from "@/components/NameCard";

interface Props {
  params: {
    lang: string;
  };
  searchParams: {
    q?: string;
  };
}

export default function SearchResultPage({ params, searchParams }: Props) {
  const lang = params.lang;
  const query = searchParams.q || "";

  const results = mockNames.filter(
    (item: Name) =>
      item.lang === lang &&
      item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        “{query}” bo‘yicha natijalar
      </h1>

      {results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((item) => (
            <NameCard
              key={item.id}
              id={item.id}
              name={item.name}
              meaning={item.meaning}
              lang={item.lang}
              views={125} // 🔄 Bu keyinchalik Firebase'dan olinadi
              likes={10}   // 🔄 Dinamik qiymatlar bo‘ladi
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Hech qanday ism topilmadi.</p>
      )}
    </main>
  );
}
