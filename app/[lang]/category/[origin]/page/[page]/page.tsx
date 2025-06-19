import { mockNames } from "@/lib/mockNames";
import { Name } from "@/types/name";
import AlphabetFilter from "@/components/AlphabetFilter";
import SimpleNameItem from "@/components/SimpleNameItem";
import { categoryLabels } from "@/lib/categoryLabels";

interface Props {
  params: {
    lang: string;
    origin: string;
    page: string;
  };
}

const ITEMS_PER_PAGE = 20;

export default function CategoryPage({ params }: Props) {
  const { lang, origin, page } = params;
  const pageNumber = parseInt(page) || 1;

  const all = mockNames.filter(
    (item: Name) => item.category === origin && item.lang === lang
  );

  const paginated = all.slice(
    (pageNumber - 1) * ITEMS_PER_PAGE,
    pageNumber * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(all.length / ITEMS_PER_PAGE);
  const categoryName = categoryLabels[origin] || origin; // labelni olamiz

  return (
    <main className="max-w-5xl mx-auto p-4">
      <AlphabetFilter lang={lang} selected="" />

      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        {categoryName}
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
        <p className="text-gray-500">Bu turkumga oid ism topilmadi.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageLink =
              i === 0
                ? `/${lang}/category/${origin}`
                : `/${lang}/category/${origin}/page/${i + 1}`;
            return (
              <a
                key={i}
                href={pageLink}
                className={`px-3 py-1 border rounded ${
                  i + 1 === pageNumber
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </a>
            );
          })}
        </div>
      )}
    </main>
  );
}
