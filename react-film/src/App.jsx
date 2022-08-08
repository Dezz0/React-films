import React from "react";
import { Routes, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Films from "./components/Films";
import Main from "./components/Main";
import Layout from "./components/subcomponents/Layout";
import TVSeries from "./components/TVSeries";
import Singlepage from "./components/Singepage";
import NotFoundPage from "./components/NotFoundPage";
import SearchByName from "./components/SearchByName";

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="React-films" element={<Main />} />
          <Route path="films" element={<Films />} />
          <Route path="tv-series" element={<TVSeries />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="search/:name" element={<SearchByName />} />
          <Route path="movies/:id" element={<Singlepage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
