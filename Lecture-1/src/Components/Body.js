import { useState } from "react";
import { RES_CARDS_DATA } from "../utils/mock-data";
import RestaurantCard from "./RestaurantCard";

export const BodyComponent = () => {
  const [resData, setResData] = useState(RES_CARDS_DATA);
  return (
    <div className="body">
      <div className="search">Search</div>
      <button
        onClick={() => {
          setResData(RES_CARDS_DATA.filter((res) => res.info.avgRating > 4.2));
        }}
      >
        Top rated restaurant
      </button>
      <div className="res-container">
        {resData.map((resCard) => {
          return <RestaurantCard key={resCard.info.id} resData={resCard} />;
        })}
      </div>
    </div>
  );
};
