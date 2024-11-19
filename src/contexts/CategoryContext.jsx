import { useContext } from "react";
import { createContext, useState } from "react";

/**
 * @typedef CategoryContextData
 * @property {string} activeCategory
 * @property {React.Dispatch<React.SetStateAction<string>>} setActiveCategory
 */

const CategoryContext = createContext();

export const useCategoryContext = () => {
  /** @type {CategoryContextData | undefined} */
  const data = useContext(CategoryContext);
  if (!data) throw new Error("Cannot Use Category Context Outside It's Provider.");

  return data;
};

export const CategoryProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("01");

  return <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>{children}</CategoryContext.Provider>;
};
