import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import NameCard from "@/components/NameCard";

interface Props {
  params: {
    lang: string;
  };
}

export default function PopularMalePage({ params }: Props) {
  const { lang } = params;

  const topMaleNames = mockNames
    .filter((item: Name) => item.gender === "male" && item.lang === lang)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 100);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Eng ko‘p qidirilgan 100 ta erkaklar ismlari
      </h1>

      {topMaleNames.length > 0 ? (
        <div className="grid gap-4">
          {topMaleNames.map((item) => (
            <NameCard
              key={item.id}
              id={item.id}
              name={item.name}
              meaning={item.meaning}
              lang={item.lang}
              likes={item.likes || 0}
              views={item.views || 0}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Hozircha mashhur erkak ismlar topilmadi.</p>
      )}
    </main>
  );
}
