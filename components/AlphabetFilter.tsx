"use client";

import { useRouter } from "next/navigation";

interface Props {
  lang: string;
  selected: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetFilter({ selected, lang }: Props) {
  const router = useRouter();

  const handleClick = (letter: string) => {
    router.push(`/${lang}/alphabet/${letter.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {ALPHABETS.map((letter) => (
        <button
          key={letter}
          onClick={() => handleClick(letter)}
          className={`px-3 py-1 border rounded-lg text-sm transition ${
            selected.toLowerCase() === letter.toLowerCase()
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
