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
        {filteredResData.length === 0 && (
          <div class="h-screen bg-gradient-to-br bg-skin to-slate-100">
            <div class="flex flex-col justify-center h-screen max-w-6xl mx-auto p-5">
              <h1 class="text-8xl text-orange font-bold [font-size:_clamp(2.5em,8vw,7em)] mb-3">
                Oops!
              </h1>
              <hr class="mb-5 w-36 h-1 bg-teal border-0" />
              <p class="mb-5 text-xl sm:text-3xl text-orange">
                Sorry, there was an error loading this page.
              </p>
              <div class="mb-5 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-base">
                <Link
                  to="/"
                  class="flex flex-nowrap whitespace-nowrap sm:px-3 sm:py-1 px-2 py-.5 gap-1 items-center font-semibold text-orange rounded-md border border-teal hover:bg-orange hover:text-white active:scale-95 transition"
                  href="/"
                >
                  Go home
                </Link>
              </div>
            </div>
          </div>
        )}

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
