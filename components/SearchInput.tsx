import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchInput({ search, onSearchChange }: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Ism qidirish..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
}
