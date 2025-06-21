import { mockFamousPeople } from "@/lib/mockFamousPeople";
import { notFound } from "next/navigation";
import { Briefcase, Calendar } from "lucide-react";

interface Props {
  params: {
    lang: string;
    slug: string;
  };
}

export default function PersonDetailPage({ params }: Props) {
  const person = mockFamousPeople.find(
    (p) => p.id === params.slug && p.lang === params.lang
  );

  if (!person) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{person.name}</h1>

        {/* Kasbi va yashagan yillari */}
        <div className="flex gap-4 flex-wrap text-sm text-gray-600 mb-4">
          {person.profession && (
            <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-full">
              <Briefcase size={16} /> {person.profession}
            </span>
          )}
          {person.lifespan && (
            <span className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-full">
              <Calendar size={16} /> {person.lifespan}
            </span>
          )}
        </div>

        <p className="text-gray-700 text-lg">{person.description}</p>
      </div>
    </main>
  );
}
