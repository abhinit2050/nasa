import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Apod from "../pages/Apod";
import Mars from "../pages/Mars";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/mars" element={<Mars />} />
      </Routes>
    </BrowserRouter>
  );
}