interface Props {
  selected: string;
  onSelect: (letter: string) => void;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {ALPHABETS.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelect(letter)}
          className={`px-3 py-1 border rounded-lg text-sm transition ${
            selected === letter
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
