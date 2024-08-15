import CDN_URL from "../utils/constant";

const CategoryList = ({ listItems }) => {
  console.log(listItems);
  return (
    <div>
      {listItems.map((item, index) => {
        return (
          <div
            className={
              index === listItems.length - 1
                ? "p-4 m-2"
                : "p-4 m-2 border-orange border-b-2"
            }
            key={item?.card.info?.id}
          >
            <div className="flex justify-between">
              <div className="w-[80%] text-left">
                <span className="text-xl font-bold">
                  {item?.card?.info?.name}
                </span>
                <p className="text-2xl">
                  {" "}
                  ₹
                  {item?.card?.info?.price
                    ? item?.card?.info?.price / 100
                    : item?.card?.info?.defaultPrice / 100}
                </p>
                <p className="text-xs">{item?.card?.info?.description}</p>
              </div>
              <div className="container">
                <img
                  className="w-28 "
                  src={
                    item?.card?.info?.imageId
                      ? CDN_URL + item?.card?.info?.imageId
                      : require("../../Public/default-image.jpeg")
                  }
                />
                <button className="btn p-1  shadow-xl rounded-lg   text-white bg-orange">
                  Add +
                </button>
              </div>
              {/*  shadow-xl rounded-lg  mx-8 my-14 text-white bg-orange */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
