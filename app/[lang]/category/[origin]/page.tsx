import { mockNames } from "@/lib/mockNames";
import NameCard from "@/components/NameCard";
import { useTranslation } from "@/lib/useTranslation";

interface Props {
  params: {
    lang: string;
    origin: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { lang, origin } = params;
  const { t } = useTranslation(lang);

  const filtered = mockNames.filter(
    (item) => item.category.toLowerCase() === origin.toLowerCase()
  );

  const originNameMap: Record<string, string> = {
    arab: "Arab ismlari",
    persian: "Fors ismlari",
    turk: "Turk ismlari",
  };

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-blue-700 mb-4">
        {originNameMap[origin] || origin} ({filtered.length} ta ism)
      </h1>

      {filtered.length > 0 ? (
        <div className="grid gap-4">
          {filtered.map((item) => (
            <NameCard key={item.id} name={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Bu turkumda ism topilmadi.</p>
      )}
    </main>
  );
}
