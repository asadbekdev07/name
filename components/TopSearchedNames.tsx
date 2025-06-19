import Link from "next/link";
import { Name } from "@/types/name";

interface Props {
  maleNames: Name[];
  femaleNames: Name[];
  lang: string;
}

export default function TopSearchedNames({ maleNames, femaleNames, lang }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      {/* Erkaklar ismlari */}
      <div className="bg-blue-50 rounded-lg shadow p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Eng ko‘p qidirilgan erkaklar ismlari
        </h2>
        <ul className="space-y-2 flex-grow">
          {maleNames.slice(0, 5).map((name) => (
            <li
              key={name.id}
              className="flex justify-between items-center px-2 py-2 hover:bg-blue-100 rounded transition"
            >
              <Link
                href={`/${name.lang}/name/${name.name.toLowerCase()}`}
                className="text-blue-800 font-medium"
              >
                ♂ {name.name}
              </Link>
              <span className="text-sm text-gray-600">
                {name.views ?? 0} marta
              </span>
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/popular/male`} className="mt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
            Batafsil
          </button>
        </Link>
      </div>

      {/* Ayollar ismlari */}
      <div className="bg-pink-50 rounded-lg shadow p-4 flex flex-col justify-between">
        <h2 className="text-lg font-bold text-pink-700 mb-4">
          Eng ko‘p qidirilgan ayollar ismlari
        </h2>
        <ul className="space-y-2 flex-grow">
          {femaleNames.slice(0, 5).map((name) => (
            <li
              key={name.id}
              className="flex justify-between items-center px-2 py-2 hover:bg-pink-100 rounded transition"
            >
              <Link
                href={`/${name.lang}/name/${name.name.toLowerCase()}`}
                className="text-pink-800 font-medium"
              >
                ♀ {name.name}
              </Link>
              <span className="text-sm text-gray-600">
                {name.views ?? 0} marta
              </span>
            </li>
          ))}
        </ul>
        <Link href={`/${lang}/popular/female`} className="mt-4">
          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition">
            Batafsil
          </button>
        </Link>
      </div>
    </div>
  );
}
