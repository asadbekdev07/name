export const mockNames = [
  {
    id: "1",
    name: "Ali",
    meaning: "Yuqori, ulug‘",
    alphabet: "a",
    category: "arab", // turkum
    gender: "male",   // jins
    lang: "uz",       // til
  },
  {
    id: "2",
    name: "Laylo",
    meaning: "Tun, kecha",
    alphabet: "l",
    category: "arab",
    gender: "female",
    lang: "uz",
  },
  {
    id: "3",
    name: "Shirin",
    meaning: "Shirin, yoqimli",
    alphabet: "s",
    category: "persian",
    gender: "female",
    lang: "uz",
  },
  {
  id: "999",
  name: "Elyor",
  meaning: "Do‘st, yaqin kishi",
  gender: "male",           // ✅ kerakli qiymat
  category: "arab",
  alphabet: "e",            // ✅ har doim kichik harf bo‘lsin yaxshilik uchun
  lang: "uz",
}
];
