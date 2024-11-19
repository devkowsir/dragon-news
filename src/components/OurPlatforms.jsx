import React from "react";
import fb from "../assets/images/fb.png";
import instagram from "../assets/images/instagram.png";
import twitter from "../assets/images/twitter.png";

export const OurPlatforms = () => {
  return (
    <div>
      <h4 className="mb-4 text-xl font-semibold">Find Us On</h4>

      <ul className="overflow-hidden text-gray-500 border rounded">
        <li className="p-4 border">
          <a href="" className="flex gap-2 items-center">
            <img src={fb} alt="" />
            <span>Facebook</span>
          </a>
        </li>
        <li className="p-4 border">
          <a href="" className="flex gap-2 items-center">
            <img src={instagram} alt="" />
            <span>Instagram</span>
          </a>
        </li>
        <li className="p-4 border">
          <a href="" className="flex gap-2 items-center">
            <img src={twitter} alt="" />
            <span>Twitter</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
