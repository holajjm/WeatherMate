import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import NavigationBar from "@components/layout/NavigationBar";

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
