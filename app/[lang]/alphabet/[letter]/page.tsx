import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";

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
      <AlphabetFilter lang={lang} selected={letter} />
      
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {filtered.length > 0 ? (
  <ul className="bg-gray-50 rounded-md shadow-sm border border-gray-200">
    {filtered.map((item) => (
      <SimpleNameItem
  key={item.id}
  id={item.id}
  name={item.name}
  lang={item.lang}
  gender={item.gender} // gender uzatiladi
/>
    ))}
  </ul>
) : (
  <p className="text-gray-500">Bu harfga oid ism topilmadi.</p>
)}
    </main>
  );
}
