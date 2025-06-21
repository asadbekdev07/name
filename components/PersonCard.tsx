import Link from "next/link";
import { Briefcase, Calendar } from "lucide-react";

interface PersonCardProps {
  id: string;
  name: string;
  description: string;
  lang: string;
  profession?: string;
  lifespan?: string;
}

export default function PersonCard({
  id,
  name,
  description,
  lang,
  profession,
  lifespan,
}: PersonCardProps) {
  return (
    <Link
      href={`/${lang}/person/${id}`}
      className="block p-5 rounded-xl border hover:shadow-md bg-white transition"
    >
      <h3 className="text-lg font-semibold text-blue-800 mb-2">{name}</h3>

      {/* Kasbi va yashagan yillari */}
      <div className="flex gap-2 flex-wrap mb-2 text-sm">
        {profession && (
          <span className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-full text-gray-700">
            <Briefcase size={14} />
            {profession}
          </span>
        )}
        {lifespan && (
          <span className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-full text-gray-700">
            <Calendar size={14} />
            {lifespan}
          </span>
        )}
      </div>

      {/* Tavsifi */}
      <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
    </Link>
  );
}
