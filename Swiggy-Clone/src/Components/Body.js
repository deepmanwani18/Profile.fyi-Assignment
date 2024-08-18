import { useEffect, useState } from "react";
import RestaurantCard, { promotedResCard } from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import { FIND_RES_URL } from "../utils/constant";
import { CorsError } from "./CorsError";

export const BodyComponent = () => {
  const [resData, setResData] = useState([]);
  const [filteredResData, setfilteredResData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // retrieving the higher order component for promoted badge on restaurant card
  // PromotedResCard is a higher order component
  
  const PromotedResCard = promotedResCard(RestaurantCard);
  // please use chrome's cors extension since this is swiggy's API, not installing the extension will lead to CORS issue.
  const fetchData = async () => {
    try {
      const data = await fetch(FIND_RES_URL);
      if (!data.ok) {
        throw new Error("HTTP Error!");
      }
      const json = await data.json();
      setResData(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setfilteredResData(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Please install corse chrome extension to view app");
      setResData(null);
      setfilteredResData(null);
    }
  };

  // clears the search filter, be it from search button or 'show top restaurants'

  const clearSearch = () => {
    setSearchQuery("");
    const newResData = resData.filter((res) =>
      res.info.name.toLowerCase().includes("".toLowerCase())
    );
    setfilteredResData(newResData);
  };

  // in case of CORS issue, setting the resData as null
  // initial state of resData is empty array
  // Errors are handled accordingly
  return resData === null ? (
    <>
      <CorsError />
    </>
  ) : resData.length === 0 ? (
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
    <div className="h-full bg-skin">
      <div className="flex justify-between">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="m-4 border border-solid rounded"
          />
          <button
            className="m-4 hover:bg-white bg-orange py-1 px-4 rounded text-white hover:text-orange font-bold"
            onClick={() => {
              const newResData = resData.filter((res) =>
                res.info.name.toLowerCase().includes(searchQuery.toLowerCase())
              );
              setfilteredResData(newResData);
            }}
          >
            Search
          </button>
          <button
            className="m-4 bg-white hover:bg-orange py-1 px-4 rounded text-orange hover:text-white font-bold"
            onClick={clearSearch}
          >
            Clear Filter
          </button>
        </div>
        <button
          onClick={() => {
            setfilteredResData(
              filteredResData.filter((res) => res.info.avgRating > 4.2)
            );
          }}
          className="bg-orange hover:bg-white rounded py-1 px-4 m-4 text-white hover:text-orange font-bold"
        >
          See Top rated restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredResData.length === 0 && (
          <div className="bg-gradient-to-br bg-skin ">
            <div className="flex flex-col justify-center h-[80vh] max-w-6xl mx-auto p-5">
              <h1 className="text-8xl text-orange font-bold [font-size:_clamp(2.5em,8vw,7em)] mb-3">
                Oops!
              </h1>
              <hr className="mb-5 w-36 h-1 bg-teal border-0" />
              <p className="mb-5 text-xl sm:text-3xl text-orange">
                Sorry, try searching something else.
              </p>
              <div className="mb-5 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-base">
                <button
                  onClick={clearSearch}
                  className=" flex-nowrap whitespace-nowrap sm:px-3 sm:py-1 px-2 py-.5 gap-1 items-center font-semibold text-orange rounded-md border border-teal hover:bg-orange hover:text-white active:scale-95 transition"
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredResData.map((resCard) => {
          return (
            <Link key={resCard.info.id} to={"restaurants/" + resCard.info.id}>
              {!resCard?.info?.badges?.imageBadges ? (
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
