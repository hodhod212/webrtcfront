import React from "react";
import Header from "../../components/header/Header";
import MainPage from "../main/MainPage";
import "./homepage.css";
const HomePage = () => {
  return (
    <>
      <Header page='home' />
      <div className="home">
        {Array.from({ length: 20 }).map((_, index) => (
          <MainPage key={`ali-${index}`} id={index} page="main" />
        ))}
      </div>
    </>
  );
};

export default HomePage;
