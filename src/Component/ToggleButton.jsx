import { useContext } from "react";
import TriggerContext from "../store/ToggleContext";


export default function TriggerToggle() {
  const { trigger, setTrigger } = useContext(TriggerContext);
 
  return (
    <div className="flex gap-4 items-center mb-4">
      <span className="font-medium">Trigger:</span>
      <div className="border  rounded-md">
      <button
        onClick={() => setTrigger("click")}
        className={`px-3 py-1 border rounded-l-md ${
          trigger === "click" ? "bg-black text-white" : "bg-white"
        }`}
      >
        Click
      </button>

      <button
        onClick={() => setTrigger("hover")}
        className={`px-3 py-1 border rounded-r-md ${
          trigger === "hover" ? "bg-black text-white" : "bg-white"
        }`}
      >
        Hover
      </button>
      </div>
    </div>
  );
}
