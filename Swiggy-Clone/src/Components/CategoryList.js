import { useCart } from "../utils/CartContext";
import CDN_URL from "../utils/constant";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
        resName: resName,
      },
    });
  };
  const removeItemsFromCart = (index) => {
    const { id, price, name, defaultPrice } = listItems[index]?.card?.info;
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
  const style = {
    transform: "translate(-50%, -50%)",
    width: 600,
    p: 4,
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
                  <div className="btn flex justify-between w-16 p-1 shadow-xl rounded-lg text-white bg-orange">
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
      <Modal
        open={open}
        index={modalIndex}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="bg-skin rounded-lg absolute top-[50%] left-[50%] shadow-lg"
          sx={style}
        >
          <h1 className=" text-orange font-bold">Items already in cart</h1>
          <h2>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </h2>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="  px-4 py-2 rounded-lg text-orange bg-white"
            >
              Cancel
            </button>
            <button
              onClick={() => clearCartAndAddNewItem(modalIndex)}
              className="  px-4 py-2 rounded-lg text-white bg-orange"
            >
              Yes
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryList;
