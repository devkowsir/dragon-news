import React from "react";
import { Link, useLocation } from "react-router-dom";
import placeHolderImage from "../assets/images/user.png";
import { useAuthContext } from "../contexts/AuthContext";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuthContext();

  return (
    <nav className="flex">
      <div className="hidden w-32 sm:block"></div>
      <ul className="mr-auto flex gap-4 text-lg text-neutral-500 sm:ml-auto">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/career">Career</Link>
        </li>
      </ul>
      <div className="shrink-0 flex items-center gap-4">
        {user ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              <img src={user.photoURL ? user.photoURL : placeHolderImage} className="w-12 aspect-square rounded-full" />
            </div>
            <button onClick={logout} className="btn btn-md btn-neutral w-28 text-lg font-medium rounded-md">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={pathname == "/login" ? "/register" : "/login"}
              className="btn btn-neutral w-28 text-lg font-medium rounded-md"
            >
              {pathname == "/login" ? "Register" : "Login"}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
