import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ApiBase, Categories, Headings } from "../config";
import { useEffect } from "react";
import { FaEye, FaRegBookmark, FaRegShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Rating } from "./Rating";

export const NewsList = () => {
  const { slug } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoryId = getCategoryId(slug);
    if (!categoryId) return;

    setLoading(true);
    fetch(`${ApiBase}/category/${categoryId}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setNewsList(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (!getCategoryId(slug)) return <Navigate to={"/category/breaking"} />;

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">{Headings.newsList}</h3>

      <ul className="space-y-3">
        {loading ? (
          <div className="mt-24 flex justify-center items-center">
            <div className="loading loading-ring loading-lg text-gray-800"></div>
          </div>
        ) : newsList.length ? (
          newsList.map((news) => (
            <li key={news._id} className="border-2 border-gray-200 rounded">
              <div className="px-5 py-4 flex items-center bg-gray-200">
                <img
                  loading="lazy"
                  src={news.author.img}
                  alt={news.author.name}
                  className="w-12 aspect-square rounded-full"
                />
                <div className="ml-2">
                  <h5 className="text-gray-800 font-semibold">{news.author.name}</h5>
                  <p className="mt-1 text-sm text-gray-500">{news.author.published_date?.split(" ")[0]}</p>
                </div>
                <div className="ml-auto flex">
                  <button className="btn btn-ghost">
                    <FaRegBookmark size={24} />
                  </button>
                  <button className="btn btn-ghost">
                    <FaRegShareFromSquare size={24} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div>
                  <h4 className="mb-4 text-xl text-gray-700 font-bold">{news.title}</h4>
                  <img src={news.image_url} alt={news.title} />
                  <p className="mt-8 text-gray-600">
                    {news.details.slice(0, 200)}...{" "}
                    <Link to={`/news/${news._id}`} className="text-orange-500">
                      Read More
                    </Link>
                  </p>
                </div>
                <hr className="my-5" />
                <div className="flex justify-between items-center gap-2 text-gray-600">
                  <div className="flex items-center gap-4">
                    <Rating maxRating={5} achievedRating={news.rating.number} />
                    <span>{news.rating.number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye />
                    <span>{news.total_view}</span>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="mt-24">
            <p className="text-center text-lg text-gray-500">No News in this Category.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

function getCategoryId(slug) {
  return Categories.find(({ slug: c_slug }) => c_slug == slug)?.id;
}
