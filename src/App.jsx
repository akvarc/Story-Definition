import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoryDetail from "./Component/StoryDetail";
import StoryList from "./Component/StoryList";
import { ToggleContext } from "./store/ToggleContext";

export default function App() {
  return (
    <ToggleContext>
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<StoryList/>} />
        <Route path="/story/:id" element={<StoryDetail/>} />
      </Routes>
      
    </BrowserRouter>
    </ToggleContext>
  );
}
