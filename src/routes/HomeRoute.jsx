import React from "react";
import { Outlet } from "react-router-dom";
import { OurPlatforms } from "../components/OurPlatforms";
import { QuickLogin } from "../components/QuickLogin";
import { CategoryNav } from "../features/CategoryNav";
import { HomeLayout } from "../layouts";
import { useAuthContext } from "../contexts/AuthContext";

const AsideLeft = () => {
  return (
    <div className="space-y-5">
      <CategoryNav />
    </div>
  );
};

const AsideRight = () => {
  const { user } = useAuthContext();
  return (
    <div className="space-y-5">
      {!user && <QuickLogin />}
      <OurPlatforms />
    </div>
  );
};

export const HomeRoute = () => {
  return <HomeLayout asideLeft={<AsideLeft />} main={<Outlet />} asideRight={<AsideRight />} />;
};
