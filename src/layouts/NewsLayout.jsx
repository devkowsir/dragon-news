import React from "react";
import { Brand } from "../components/Brand";

export const NewsLayout = ({ children, asideRight }) => {
  return (
    <div className="container pt-12">
      <Brand />

      <div className="mt-20 grid gap-4 lg:grid-cols-4">
        <div className="col-span-3">{children}</div>
        <aside>{asideRight}</aside>
      </div>
    </div>
  );
};
