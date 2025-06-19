"use client";
import Link from "next/link";
import { Mars, Venus } from "lucide-react";

interface Props {
  name: string;
  lang: string;
  gender: string;
}

export default function SimpleNameItem({ name, lang, gender }: Props) {
  const genderLabel =
    gender === "male"
      ? {
          icon: <Mars size={14} className="text-blue-700" />,
          text: "Erkak",
          color: "bg-blue-100 text-blue-800",
        }
      : {
          icon: <Venus size={14} className="text-pink-700" />,
          text: "Ayol",
          color: "bg-pink-100 text-pink-800",
        };

  return (
    <li className="border-b border-gray-200 last:border-none">
      <Link
        href={`/${lang}/name/${name.toLowerCase()}`}
        className="flex items-center justify-between py-3 px-4 hover:bg-blue-50 transition"
      >
        <span className="text-blue-900 font-medium">{name}</span>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${genderLabel.color}`}
        >
          {genderLabel.icon}
          {genderLabel.text}
        </span>
      </Link>
    </li>
  );
}
