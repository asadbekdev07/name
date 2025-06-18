"use client";

import { usePathname, useRouter } from "next/navigation";

const languages = ["uz", "en", "tr", "kk"];

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1];

  const handleChange = (lang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => handleChange(lang)}
          className={`px-3 py-1 rounded-md border text-sm font-medium ${
            lang === currentLang
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
