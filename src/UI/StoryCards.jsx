import { Link } from "react-router-dom";

export default function StoryCard({ story }) {
  return (
    <Link to={`/story/${story.id}`} className="no-underline">
      <div className="
        border border-black
        p-6
        cursor-pointer
        transition
        hover:bg-black hover:text-white
      ">
        <h3 className="text-lg font-semibold">{story.title}</h3>
      </div>
    </Link>
  );
}
