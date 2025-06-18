import Link from "next/link";
import { Heart, Eye } from "lucide-react";

interface Props {
  id: string;
  name: string;
  meaning: string;
  lang: string;
  likes?: number;
  views?: number;
}

export default function NameCard({
  id,
  name,
  meaning,
  lang,
  likes = 0,
  views = 0,
}: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Chap qism: Ism + ma'nosi */}
      <div>
        <Link
          href={`/${lang}/name/${name.toLowerCase()}`}
          className="text-xl font-semibold text-blue-700 hover:underline"
        >
          {name}
        </Link>
        <p className="text-gray-600 mt-1 text-sm">{meaning}</p>
      </div>

      {/* O'ng qism: likes, views, batafsil */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <Heart size={16} className="text-pink-500" />
          {likes}
        </div>
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <Eye size={16} />
          {views}
        </div>
        <Link
          href={`/${lang}/name/${name.toLowerCase()}`}
          className="text-sm text-white bg-blue-600 hover:bg-blue-700 rounded px-3 py-1"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
}
