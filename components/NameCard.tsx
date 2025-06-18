import { Name } from "@/types/name";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  name: Name;
}

export default function NameCard({ name }: Props) {
  const originLabelMap: Record<string, string> = {
    arab: "Arab",
    persian: "Fors",
    turk: "Turk",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition">
      <h3 className="text-xl font-bold text-blue-800">{name.name}</h3>

      <p className="text-gray-600 mt-1 text-sm">{name.meaning}</p>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge variant="secondary">{name.gender === "male" ? "Erkak" : "Ayol"}</Badge>

        {name.origin && (
          <Link href={`/${name.lang}/category/${name.origin}`}>
            <Badge variant="outline" className="hover:bg-gray-100">
              {originLabelMap[name.origin] || name.origin}
            </Badge>
          </Link>
        )}
      </div>
    </div>
  );
}
