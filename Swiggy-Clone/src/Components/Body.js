import { useEffect, useState } from "react";
import RestaurantCard, { promotedResCard } from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import { FIND_RES_URL } from "../utils/constant";

export const BodyComponent = () => {
  const [resData, setResData] = useState([]);
  const [filteredResData, setfilteredResData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // retrieving the higher order component
  // https://proxy.cors.sh/
  const PromotedResCard = promotedResCard(RestaurantCard);

  const fetchData = async () => {
    const data = await fetch(FIND_RES_URL);
    const json = await data.json();
    setResData(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredResData(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return resData.length === 0 ? (
    <div className="shimmer-container">
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
      <Shimmer />
    </div>
  ) : (
    <div className="bg-skin">
      <div className="flex justify-between">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="m-4 border border-solid rounded"
          />
          <button
            className="m-4 bg-orange py-1 px-4 rounded text-white font-bold"
            onClick={() => {
              const newResData = resData.filter((res) =>
                res.info.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              setfilteredResData(newResData);
            }}
          >
            Search
          </button>
        </div>
        <button
          onClick={() => {
            setfilteredResData(
              filteredResData.filter((res) => res.info.avgRating > 4.2)
            );
          }}
          className="bg-orange rounded py-1 px-4 m-4 text-white font-bold"
        >
          See Top rated restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredResData.length === 0 && <p>404! Not found</p>}

        {filteredResData.map((resCard) => {
          return (
            <Link key={resCard.info.id} to={"restaurants/" + resCard.info.id}>
              {!resCard?.info?.isOpen ? (
                <RestaurantCard resData={resCard} />
              ) : (
                <PromotedResCard resData={resCard} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
