import CDN_URL from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, sla, costForTwo } = resData?.info;
  return (
    <div className="m-4 p-4 w-[250px] h-[450px] bg-skin shadow-lg rounded-lg">
      <img
        className="w-56 h-[200px] rounded-lg"
        src={CDN_URL + resData.info.cloudinaryImageId}
      />
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{sla.deliveryTime} minutes</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

// Higher order component, taking functional component as an argument and returning a modified component
export const promotedResCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <span className="absolute bg-orange rounded p-0.5 m-1 text-white">Open now</span>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
