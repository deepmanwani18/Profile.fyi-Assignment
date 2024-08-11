import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { singleResDataUrl } from "../utils/constant";

const RestaurantMenu = () => {
  const [resDataJson, setResDataJson] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const params = useParams();
  const fetchData = async () => {
    const data = await fetch(
      singleResDataUrl[0] + params.id + singleResDataUrl[1]
    );
    const json = await data.json();
    setResDataJson(json);
  };
  if (resDataJson === null) {
    return <Shimmer />;
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
