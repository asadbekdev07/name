import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";
import Pagination from "@/components/Pagination"; // <- pagination component

interface Props {
  params: {
    lang: string;
    letter: string;
  };
  searchParams?: {
    page?: string;
  };
}

const NAMES_PER_PAGE = 30;

export default function AlphabetPage({ params, searchParams }: Props) {
  const { letter, lang } = params;
  const page = parseInt(searchParams?.page || "1");

  const filtered = mockNames.filter(
    (item: Name) =>
      item.alphabet.toLowerCase() === letter.toLowerCase() &&
      item.lang === lang
  );

  const totalPages = Math.ceil(filtered.length / NAMES_PER_PAGE);
  const start = (page - 1) * NAMES_PER_PAGE;
  const paginated = filtered.slice(start, start + NAMES_PER_PAGE);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <AlphabetFilter lang={lang} selected={letter} />

      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        “{letter.toUpperCase()}” harfi bilan boshlanadigan ismlar
      </h1>

      {paginated.length > 0 ? (
        <ul className="bg-gray-50 rounded-md shadow-sm border border-gray-200">
          {paginated.map((item) => (
            <SimpleNameItem
              key={item.id}
              id={item.id}
              name={item.name}
              lang={item.lang}
              gender={item.gender}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Bu harfga oid ism topilmadi.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/${lang}/alphabet/${letter}`}
          />
        </div>
      )}
    </main>
  );
}
