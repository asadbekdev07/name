import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import NameCard from "@/components/NameCard";

interface Props {
  params: {
    lang: string;
  };
}

export default function PopularFemalePage({ params }: Props) {
  const { lang } = params;

  const topFemaleNames = mockNames
    .filter((item: Name) => item.gender === "female" && item.lang === lang)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 100);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">
        Eng ko‘p qidirilgan 100 ta ayollar ismlari
      </h1>

      {topFemaleNames.length > 0 ? (
        <div className="grid gap-4">
          {topFemaleNames.map((item) => (
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
        <p className="text-gray-500">Hozircha mashhur ayol ismlar topilmadi.</p>
      )}
    </main>
  );
}
