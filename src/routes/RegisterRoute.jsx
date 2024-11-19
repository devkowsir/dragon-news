import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts";
import { isValidEmail, isValidName, isValidPassword, isValidPhotoURL } from "../utils/input-validators";
import { useAuthContext } from "../contexts/AuthContext";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuthContext();

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const displayName = e.target.name.value.trim();
      const photoURL = e.target["photo-url"].value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();

      if (!isValidName(displayName)) return;
      if (photoURL.length && !(await isValidPhotoURL(photoURL))) return;
      if (!isValidEmail(email)) return;
      if (!isValidPassword(password)) return;

      await registerUser({ displayName, photoURL, email, password });

      const searchParams = new URLSearchParams(location.search);
      let redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
      if (!redirectTo.startsWith("/")) redirectTo = "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error(error.message, error);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-screen-sm mx-auto p-8 bg-white sm:p-12 lg:p-20">
        <h1 className="text-center text-3xl font-semibold sm:text-4xl">Register a New Acount</h1>
        <hr className="mt-12 mb-8" />
        <form onSubmit={handleSubmit} className="max-w-screen-sm mb-8 mx-auto">
          <label className="mb-4 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Name*</span>
            </div>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <label className="mb-4 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Photo URL</span>
            </div>
            <input
              type="text"
              name="photo-url"
              placeholder="Enter your photo url"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <label className="mb-4 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Email*</span>
            </div>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <label className="mb-8 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Password*</span>
            </div>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <button className="btn btn-neutral w-full">Login</button>
        </form>
        <p className="text-center">
          Don't Have An Account?{" "}
          <Link className="text-orange-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
