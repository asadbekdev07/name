"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    // Foydalanuvchini natijalar sahifasiga yo'naltiramiz
    router.push(`/uz/search?q=${value}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ismni kiriting..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Qidirish
      </button>
    </form>
  );
}
