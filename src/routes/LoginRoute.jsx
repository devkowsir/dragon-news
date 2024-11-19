import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { AuthLayout } from "../layouts";
import { isValidEmail, isValidPassword } from "../utils/input-validators";
import { FaGoogle } from "react-icons/fa6";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, loginWithGoogle } = useAuthContext();

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();

      if (!isValidEmail(email)) return;
      if (!isValidPassword(password)) return;

      await loginUser({ email, password });

      const searchParams = new URLSearchParams(location.search);
      let redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
      if (!redirectTo.startsWith("/")) redirectTo = "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error(error.message, error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      const searchParams = new URLSearchParams(location.search);
      const redirectTo = new URL(searchParams.get("redirectTo") ?? "/", window.location.origin).pathname;
      if (!redirectTo.startsWith("/")) redirectTo = "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.error(error.message, error);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-screen-sm mx-auto p-8 bg-white sm:p-12 lg:p-20">
        <h1 className="text-center text-3xl font-semibold sm:text-4xl">Login to Your Account</h1>
        <form onSubmit={handleSubmit} className="max-w-screen-sm mb-4 mx-auto">
          <hr className="my-12" />
          <label className="mb-4 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Email</span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <label className="mb-8 form-control w-full">
            <div className="label">
              <span className="label-text text-xl font-semibold">Password</span>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md bg-gray-100 border-none"
            />
          </label>
          <button className="btn btn-neutral w-full">Login</button>
        </form>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="mb-8 btn btn-outline w-full text-blue-500 hover:bg-blue-500">
          <FaGoogle />
          <span>Login with Google</span>
        </button>
        <p className="text-center">
          Don't Have An Account?{" "}
          <Link className="text-orange-500" to={{ pathname: "/register" }}>
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
