import React from "react";
import { Brand } from "../components/Brand";
import { LatestNews } from "../components/LatestNews";
import { Navbar } from "../components/Navbar";

export const HomeLayout = ({ asideLeft, main, asideRight }) => {
  return (
    <>
      <header className="container">
        <div className="mt-12 mb-8">
          <Brand />
        </div>
        <LatestNews />
        <div className="mt-5 mb-20">
          <Navbar />
        </div>
      </header>
      <div className="container grid gap-4 lg:grid-cols-4">
        <aside className="">{asideLeft}</aside>
        <main className="lg:col-span-2">{main}</main>
        <aside className="">{asideRight}</aside>
      </div>
    </>
  );
};
