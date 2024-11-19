import React from "react";
import { Navbar } from "../components/Navbar";

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen pt-10 pb-32 bg-gray-100">
      <div className="container">
        <Navbar />
        <main className="mt-20">{children}</main>
      </div>
    </div>
  );
};
