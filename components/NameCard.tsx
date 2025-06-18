// components/NameCard.tsx
import Link from "next/link";
import { Eye, Heart } from "lucide-react";

interface Props {
  id: string;
  name: string;
  meaning: string;
  views?: number;
  likes?: number;
  lang: string;
}

export default function NameCard({
  id,
  name,
  meaning,
  views = 0,
  likes = 0,
  lang,
}: Props) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:bg-gray-50 transition space-y-2">
      <Link
        href={`/${lang}/name/${name.toLowerCase()}`}
        className="text-xl font-semibold text-blue-700 hover:underline"
      >
        {name}
      </Link>
      <p className="text-gray-600 text-sm">{meaning}</p>

      <div className="flex items-center justify-between text-sm mt-2">
        <div className="flex gap-4 text-gray-500">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {views}
          </span>
        </div>

        <Link
          href={`/${lang}/name/${name.toLowerCase()}`}
          className="text-blue-600 text-sm hover:underline"
        >
          Batafsil →
        </Link>
      </div>
    </div>
  );
}
