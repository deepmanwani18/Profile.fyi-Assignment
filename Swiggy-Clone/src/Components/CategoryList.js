import { useCart } from "../utils/CartContext";
import CDN_URL, { modalBoxStyle } from "../utils/constant";
import { useState } from "react";
import ConfirmationModal from "../utils/ConfirmationModal";
const CategoryList = ({ listItems, resId, resName }) => {
  const [open, setOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const handleClose = () => setOpen(false);
  const { dispatch } = useCart();
  const [listItemsState, setListItemsState] = useState([]);
  let cartIds = [];
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartIds = cart?.addedItems.map((i) => {
      return i.id;
    });
  }
  const handleAddItem = (index) => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart.resId !== resId && cart.addedItems.length !== 0) {
        // alert("you are ordering from different restaurant");
        setOpen(true);
        setModalIndex(index);
      } else {
        addToCart(index);
      }
    } else {
      addToCart(index);
    }
  };

  const addToCart = (index) => {
    console.log(listItems[index]);
    if (listItems[index]["addedQuantity"]) {
      listItems[index]["addedQuantity"]++;
    } else {
      listItems[index]["addedQuantity"] = 1;
    }
    setListItemsState(listItems);
    const { id, price, name, defaultPrice, imageId } =
      listItems[index]?.card?.info;

    dispatch({
      type: "ADD",
      payload: {
        item: name,
        id: id,
        price: price || defaultPrice,
        resId: resId,
        imageId: imageId,
        resName: resName,
      },
    });
  };
  const removeItemsFromCart = (index) => {
    const { id, price, name, defaultPrice, imageId } =
      listItems[index]?.card?.info;
    if (listItems[index]["addedQuantity"] === undefined) {
      listItems[index]["addedQuantity"] = cart.addedItems.filter((c) => {
        return c.id === id;
      })[0].quantity;
    }
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
          resName: resName,
          imageId: imageId,
          quantity: 1,
        },
      });
    } else {
      listItems[index]["addedQuantity"]--;
      if (listItems[index]["addedQuantity"] <= 0) {
        listItems[index]["addedQuantity"] = 0;
      }
      setListItemsState(listItems);
      dispatch({
        type: "MINUS",
        payload: {
          item: name,
          id: id,
          price: price || defaultPrice,
          resId: resId,
          resName: resName,
          imageId: imageId,
        },
      });
    }
  };
  const clearCartAndAddNewItem = (index) => {
    dispatch({
      type: "CLEAR",
    });
    addToCart(index);
    handleClose();
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
                <p className=" text-xs">{item?.card?.info?.description}</p>
              </div>
              <div className="container h-[10%]">
                <img
                  className="w-28 "
                  src={
                    item?.card?.info?.imageId
                      ? CDN_URL + item?.card?.info?.imageId
                      : require("../../Public/default-image.jpeg")
                  }
                />
                {(listItemsState[index]?.addedQuantity === undefined ||
                  listItemsState[index]?.addedQuantity <= 0) &&
                cartIds.indexOf(item?.card.info?.id) === -1 ? (
                  <button
                    onClick={() => handleAddItem(index)}
                    className="btn p-1  shadow-xl rounded-lg   text-white bg-orange"
                  >
                    Add +
                  </button>
                ) : (
                  <div className="btn  flex justify-between w-16 p-1 shadow-xl rounded-lg text-white bg-orange">
                    <span
                      onClick={() => removeItemsFromCart(index)}
                      className="px-1 cursor-pointer"
                    >
                      {" "}
                      −{" "}
                    </span>
                    <span>
                      {listItemsState[index]?.addedQuantity ||
                        cart?.addedItems[cartIds.indexOf(item?.card.info?.id)]
                          ?.quantity}
                    </span>
                    <span
                      onClick={() => addToCart(index)}
                      className="px-1 cursor-pointer"
                    >
                      +
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <ConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={() => clearCartAndAddNewItem(modalIndex)}
        title="Items already in cart"
        message="Your cart contains items from other restaurant. Would you like to
      reset your cart for adding items from this restaurant?"
      />
    </div>
  );
};

export default CategoryList;
