import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import LeftSidebar from "../LeftSidebar";

export default function Layout() {
  return (
    <>
      <LeftSidebar />
      <Header />
      <Outlet />
    </>
  );
}
