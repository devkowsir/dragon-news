import React from "react";
import { Categories, Headings } from "../config";
import { NavLink } from "react-router-dom";

export const CategoryNav = () => {
  return (
    <nav>
      <h3 className="mb-4 text-xl font-semibold">{Headings.category}</h3>
      <ul>
        {Categories.map(({ id, name, slug }) => (
          <li key={id}>
            <NavLink className={getClassNames} to={`/category/${slug}`}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

function getClassNames({ isActive }) {
  return `inline-block w-full px-4 py-2 text-xl text-left ${
    isActive ? "font-semibold bg-gray-200 text-gray-700" : "font-medium text-gray-500"
  }`;
}
