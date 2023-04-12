import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="py-6 px-48 flex flex-col bg-amber-10">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
