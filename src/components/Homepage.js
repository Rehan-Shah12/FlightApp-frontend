import "../styles/Homepage.css";
import React from "react";
import Layout from "./Layout/Layout.js";
import FlightList from "./FlightList.js";

const Homepage = () => {
  return (
    <div className=" ">
      <Layout>
        <FlightList />
      </Layout>
    </div>
  );
};

export default Homepage;
