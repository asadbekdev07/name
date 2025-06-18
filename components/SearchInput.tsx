"use client";
import { useRouter } from "next/navigation";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
}

export default function SearchInput({ search, onSearchChange }: Props) {
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/uz/search/${search.trim().toLowerCase()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown} // <-- bu qator qo‘shildi
        placeholder="Ism qidiring"
        className="border rounded px-4 py-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Qidirish
      </button>
    </div>
  );
}
