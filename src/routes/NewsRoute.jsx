import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { OurPlatforms } from "../components/OurPlatforms";
import { ApiBase, Categories, SiteName } from "../config";
import { useFetch } from "../hooks/useFetch";
import { NewsLayout } from "../layouts";

export const AsideRight = () => {
  return (
    <div className="space-y-5">
      <OurPlatforms />
    </div>
  );
};

export const NewsRoute = () => {
  const { id } = useParams();
  const { data, loading } = useFetch({ url: `${ApiBase}/${id}` });
  const news = data ? data[0] : undefined;

  console.log(news, loading, data, id);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loading loading-ring"></div>
      </div>
    );

  return (
    <NewsLayout asideRight={<AsideRight />}>
      <h2 className="mb-5">{SiteName}</h2>
      <div className="p-6 border rounded-md">
        <img src={news.image_url} alt="" />
        <h1 className="my-4 text-xl font-bold">{news.title}</h1>
        <p className="text-gray-500">{news.details}</p>
        <Link
          to={`/category/${Categories.find(({ id }) => id == news.category_id).slug}`}
          className="btn btn-wide btn-neutral mt-5 flex justify-center items-center gap-2"
        >
          <FaArrowLeft />
          <span>All new in this category</span>
        </Link>
      </div>
    </NewsLayout>
  );
};
