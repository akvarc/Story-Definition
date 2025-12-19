import { useNavigate, useParams } from "react-router-dom";
import WordWrapper from "./WordWrapper";
import stories from "../Data/stories";


export default function StoryDetails() {
  const { id } = useParams();
  const story = stories.find(s => s.id === Number(id));
  const navigate= useNavigate();
 function goback(){
    navigate("/")
 }
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Story not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-10 py-8">
        <button onClick={goback} className="flex bg-stone-300 text-center border-2 px-2 rounded-md hover:bg-amber-100">Back</button>
      <h2 className="text-2xl flex sm:text-3xl font-bold mb-6">
        <WordWrapper text = {story.title} />
      </h2>

      <div className="max-w-3xl mx-auto text-base sm:text-lg flex leading-relaxed">
        <WordWrapper text={story.content} />
      </div>
      
    </div>
  );
}
