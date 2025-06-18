import { translations } from "./translations";

export function useTranslation(lang: string) {
  const t = (key: keyof typeof translations["uz"]) => {
    return translations[lang as keyof typeof translations]?.[key] || key;
  };
  return { t };
}
