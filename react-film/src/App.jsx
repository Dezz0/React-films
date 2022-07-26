import React from "react";
import { Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Films from "./components/Films";
import Main from "./components/Main";
import Layout from "./components/subcomponents/Layout";
import TVSeries from "./components/TVSeries";

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="films" element={<Films />} />
          <Route path="tv-series" element={<TVSeries />} />
        </Route>
      </Routes>
    </div>
  );
}
