import CDN_URL, { cardStyle } from "../utils/constant";



const RestaurantCard = ({ resData }) => {
    const { name, cuisines, avgRating, sla, costForTwo } = resData?.info;
    return (
      <div className="res-card" style={cardStyle}>
        <img
          className="res-logo"
          src={
            CDN_URL +
            resData.info.cloudinaryImageId
          }
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{sla.deliveryTime} minutes</h4>
        <h4>{costForTwo}</h4>
      </div>
    );
  };

  export default RestaurantCard;