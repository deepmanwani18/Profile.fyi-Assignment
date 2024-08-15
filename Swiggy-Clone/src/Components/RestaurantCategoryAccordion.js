import CategoryList from "./CategoryList";
import { useState } from "react";

const RestaurantCategoryAccordion = ({ categoryInfo }) => {
  console.log(categoryInfo);
  const { title, itemCards } = categoryInfo?.card?.card;
  const [showAccordianData, setShowAccordianData] = useState(true);
  return (
    <div>
      <div className="w-6/12 m-auto bg-skin p-4  mb-4 rounded shadow-2xl  ">
        <div
          onClick={() => setShowAccordianData(!showAccordianData)}
          className=" flex justify-between cursor-pointer"
        >
          <span className="font-bold text-xl">
            {title} ({itemCards?.length})
          </span>
          <span> {showAccordianData ?  <>&#8963;</>: <>&#8964;</>}</span>
        </div>
        {showAccordianData && <CategoryList listItems={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategoryAccordion;
