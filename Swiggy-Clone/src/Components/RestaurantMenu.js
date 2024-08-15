import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { singleResDataUrl } from "../utils/constant";
import userFetchResMenuData from "../utils/useFetchResMenuData";

const RestaurantMenu = () => {
  const params = useParams();
  const resDataJson = userFetchResMenuData(params.id);
  if (resDataJson === null) {
    return (
      <>
        <div className="flex flex-wrap">
          <Shimmer />;
          <Shimmer />;
        </div>
      </>
    );
  }
  const { name, locality, avgRating, cuisines, costForTwoMessage } =
    resDataJson?.data?.cards[2]?.card?.card?.info;
  const foodItems =
    resDataJson?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
      ?.card?.card?.itemCards;
  return (
    <div>
      <h1>{name + ", " + locality}</h1>
      <p>{avgRating} stars</p>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {foodItems.map((foodItem) => {
        return (
          <h1 key={foodItem?.card?.info?.id}>
            {foodItem?.card?.info?.name}- Rs.{" "}
            {foodItem?.card?.info?.price / 100 ||
              foodItem?.card?.info?.defaultPrice / 100}{" "}
          </h1>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
