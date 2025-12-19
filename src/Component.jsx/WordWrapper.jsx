import { useState, useEffect, useContext } from "react";
import TriggerContext from "../store/ToggleContext";


export default function WordWrapper({ text }) {
  const { trigger } = useContext(TriggerContext);

  const [selectedWord, setSelectedWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  function handleTrigger(word, event) {
    const rect = event.target.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 8,
      left: rect.left
    });

    setSelectedWord(word);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 text-black leading-8 relative">
      {text.trim().split("\n").map((paragraph, pIndex) => {
        const words = paragraph.split(/(\s+)/);

        return (
          <p key={pIndex} className="mb-6 text-justify">
            {words.map((word, wIndex) => {
              if (/^\s+$/.test(word)) return word;

              return (
                <span
                  key={wIndex}
                  className="cursor-pointer hover:underline"
                  onClick={
                    trigger === "click"
                      ? (e) => handleTrigger(word, e)
                      : undefined
                  }
                  onMouseEnter={
                    trigger === "hover"
                      ? (e) => handleTrigger(word, e)
                      : undefined
                  }
                >
                  {word}
                </span>
              );
            })}
          </p>
        );
      })}

      {selectedWord && (
        <div
          className="fixed bg-black text-white max-w-xs text-sm rounded-lg shadow-lg p-4 z-50"
          style={{
            top: position.top,
            left: position.left
          }}
          onMouseLeave={
            trigger === "hover" ? () => setSelectedWord("") : undefined
          }
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">{selectedWord}</span>
            {trigger === "click" && (
              <button
                onClick={() => setSelectedWord("")}
                className="ml-2 text-white/70 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-white/70">Loading...</p>
          ) : (
            <p className="leading-5">{meaning}</p>
          )}
        </div>
      )}
    </div>
  );
}
