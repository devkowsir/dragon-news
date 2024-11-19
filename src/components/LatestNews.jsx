import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Headings } from "../config";

export const LatestNews = () => {
  return (
    <div className="relative px-4 py-2 flex items-center gap-4 bg-gray-100">
      <div className="p-2 font-medium text-xl text-white bg-red-600">{Headings.latest}</div>
      <div className="overflow-hidden text-gray-800 text-lg">
        <Marquee className="" speed={100} autoFill pauseOnHover>
          <Link className="inline-block leading-[44px] mx-6" href="/news/latest">
            Match Highlights: Germany vs Spain - as it happened !
          </Link>
        </Marquee>
      </div>
    </div>
  );
};
