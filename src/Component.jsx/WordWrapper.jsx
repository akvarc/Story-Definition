import { useState, useEffect } from "react";

export default function WordWrapper({ text }) {
  const [selectedWord, setSelectedWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedWord) return;

    const cleanWord = selectedWord.replace(/[^a-zA-Z]/g, "");
    if (!cleanWord) return;

    async function fetchMeaning() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`
        );
        const data = await res.json();

        setMeaning(
          data[0]?.meanings[0]?.definitions[0]?.definition ||
            "Meaning not found"
        );
      } catch {
        setMeaning("Error fetching meaning");
      } finally {
        setLoading(false);
      }
    }

    fetchMeaning();
  }, [selectedWord]);

  return (
    <div className="max-w-4xl mx-auto px-4 text-black leading-8">
      {text.trim().split("\n").map((paragraph, pIndex) => {
        // Split paragraph into words but keep spaces so it looks like natural paragraph
        const words = paragraph.split(/(\s+)/);
        return (
          <p key={pIndex} className="mb-6 text-justify">
            {words.map((word, wIndex) => {
              if (/^\s+$/.test(word)) return word; // preserve spaces
              return (
                <span
                  key={wIndex}
                  onClick={() => setSelectedWord(word)}
                  className="cursor-pointer hover:underline"
                >
                  {word}
                </span>
              );
            })}
          </p>
        );
      })}

      {/* Modal */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black max-w-md w-full rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedWord("")}
              className="absolute top-3 right-3 text-gray-600 hover:text-black font-bold text-lg"
            >
              ✕
            </button>

            <h4 className="text-xl font-semibold mb-4 text-center">
              {selectedWord}
            </h4>

            {loading ? (
              <p className="text-center text-sm text-gray-500">Loading...</p>
            ) : (
              <p className="text-sm leading-6">{meaning}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
