import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import userFetchResMenuData from "../utils/useFetchResMenuData";
import RestaurantCategoryAccordion from "./RestaurantCategoryAccordion";

const RestaurantMenu = () => {
  const params = useParams();
  // custom hook to abstract the fetching data logic
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
  // "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  const { name, locality, avgRating, cuisines, costForTwoMessage } =
    resDataJson?.data?.cards[2]?.card?.card?.info;
  const categoriesArray =
    resDataJson?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (i) => {
        return (
          i?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );

  return (
    <div className="text-center bg-skin ">
      <h1 className="font-bold  text-2xl pt-5">{name + ", " + locality}</h1>
      <p className="font-bold text-lg">{avgRating} stars</p>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categoriesArray.map((foodItem, index) => {
        return (
          <RestaurantCategoryAccordion
            key={index}
            resId={params.id}
            resName={name}
            categoryInfo={foodItem}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
