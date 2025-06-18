import NameCard from "./NameCard";
import { Name } from "@/types/name";

interface Props {
  names: Name[];
  title?: string;
}

export default function PopularNames({ names, title = "Tavsiya etilgan ismlar" }: Props) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {names.map((name) => (
          <NameCard key={name.id} name={name} />
        ))}
      </div>
    </section>
  );
}
