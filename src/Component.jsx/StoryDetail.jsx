import { useParams } from "react-router-dom";
import WordWrapper from "./WordWrapper";
import stories from "../Data/stories";


export default function StoryDetails() {
  const { id } = useParams();
  const story = stories.find(s => s.id === Number(id));

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Story not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        <WordWrapper text = {story.title} />
      </h2>

      <div className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
        <WordWrapper text={story.content} />
      </div>
    </div>
  );
}
