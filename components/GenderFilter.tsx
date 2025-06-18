"use client";

interface Props {
  selected: string;
  onSelect: (gender: string) => void;
}

const options = [
  { label: "Barchasi", value: "" },
  { label: "O‘g‘il bola", value: "male" },
  { label: "Qiz bola", value: "female" },
  { label: "Uniseks", value: "unisex" },
];

export default function GenderFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm border transition ${
            selected === opt.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
