import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoryDetail from "./Component.jsx/StoryDetail";
import StoryList from "./Component.jsx/StoryList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoryList/>} />
        <Route path="/story/:id" element={<StoryDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}
