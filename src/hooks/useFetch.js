import { useEffect } from "react";
import { useState } from "react";

export const useFetch = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.error("Error fetching from url " + url, error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
