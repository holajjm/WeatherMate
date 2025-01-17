import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "@components/layout/Footer";
import NavigationBar from "./NavigationBar";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <NavigationBar />
    </div>
  );
};

export default Layout;
