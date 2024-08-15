import { useCart } from "../utils/CartContext";
import CDN_URL from "../utils/constant";
import { useState } from "react";
const CategoryList = ({ listItems, resId }) => {
  console.log(resId);
 
  const { dispatch } = useCart();
  const [listItemsState, setListItemsState] = useState([]);
  const addToCart = (index) => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart.resId !== resId) {
        alert("you are ordering from different restaurant");
      }
    }
    if (listItems[index]["addedQuantity"]) {
      listItems[index]["addedQuantity"]++;
    } else {
      listItems[index]["addedQuantity"] = 1;
    }
    setListItemsState(listItems);
    const { id, price, name, defaultPrice } = listItems[index]?.card?.info;
    dispatch({
      type: "ADD",
      payload: {
        item: name,
        id: id,
        price: price || defaultPrice,
        resId: resId,
      },
    });
  };
  const removeItemsFromCart = (index) => {
    const { id, price, name, defaultPrice } = listItems[index]?.card?.info;

    if (listItems[index]["addedQuantity"] === 1) {
      listItems[index]["addedQuantity"] = 0;
      setListItemsState(listItems);

      dispatch({
        type: "REMOVE",
        payload: {
          item: name,
          id: id,
          price: price || defaultPrice,
          resId: resId,
        },
      });
    } else {
      listItems[index]["addedQuantity"]--;
      if (listItems[index]["addedQuantity"] <= 0) {
        listItems[index]["addedQuantity"] = 0;
      }
      setListItemsState(listItems);
      console.log(defaultPrice);
      dispatch({
        type: "MINUS",
        payload: {
          item: name,
          id: id,
          price: price || defaultPrice,
          resId: resId,
        },
      });
    }
  };
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
                {listItemsState[index]?.addedQuantity === undefined ||
                listItemsState[index]?.addedQuantity <= 0 ? (
                  <button
                    onClick={() => addToCart(index)}
                    className="btn p-1  shadow-xl rounded-lg   text-white bg-orange"
                  >
                    Add +
                  </button>
                ) : (
                  <div className="btn flex justify-between w-16 p-1 shadow-xl rounded-lg text-white bg-orange">
                    <span
                      onClick={() => removeItemsFromCart(index)}
                      className="px-1 cursor-pointer"
                    >
                      {" "}
                      −{" "}
                    </span>
                    <span>{listItemsState[index]?.addedQuantity}</span>
                    <span
                      onClick={() => addToCart(index)}
                      className="px-1 cursor-pointer"
                    >
                      +
                    </span>
                  </div>
                )}
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
