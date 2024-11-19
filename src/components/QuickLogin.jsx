import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { Headings } from "../config";
import { useAuthContext } from "../contexts/AuthContext";

export const QuickLogin = () => {
  const { loginWithGoogle } = useAuthContext();

  return (
    <div>
      <h4 className="mb-4 text-xl font-semibold">{Headings.quickLogin}</h4>
      <button onClick={loginWithGoogle} className="btn btn-outline w-full text-blue-500 hover:bg-blue-500">
        <FaGoogle />
        <span>Login with Google</span>
      </button>
    </div>
  );
};
