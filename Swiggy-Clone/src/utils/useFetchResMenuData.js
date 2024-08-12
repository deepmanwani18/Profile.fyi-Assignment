import { useEffect, useState } from "react";
import { singleResDataUrl } from "./constant";

const useFetchResMenuData = (resId) => {
  const [resDataJson, setResDataJson] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(singleResDataUrl[0] + resId + singleResDataUrl[1]);
    const json = await data.json();
    setResDataJson(json);
  };
  return resDataJson;
};

export default useFetchResMenuData;
