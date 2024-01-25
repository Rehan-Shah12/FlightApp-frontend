import React from "react";
import Header from "./Header";
import SearchSection from "./SearchSection";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <SearchSection />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
