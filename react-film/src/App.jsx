import React from "react";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="container">
      <LeftSidebar />
      <Header />
      <Main />
    </div>
  );
}
