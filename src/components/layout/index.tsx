import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import NavigationBar from "@components/layout/NavigationBar";
import ToTheTopButton from "./ToTheTopButton";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <ToTheTopButton />
      <NavigationBar />
    </div>
  );
};

export default Layout;
