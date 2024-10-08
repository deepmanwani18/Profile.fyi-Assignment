import CategoryList from "./CategoryList";
import { useState } from "react";

const RestaurantCategoryAccordion = ({ categoryInfo, resId, resName }) => {
  const { title, itemCards } = categoryInfo?.card?.card;
  const [showAccordianData, setShowAccordianData] = useState(true); 

  // Accordion Component, collapse and expand functionality

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
        {showAccordianData && <CategoryList resName={resName} resId={resId} listItems={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategoryAccordion;
