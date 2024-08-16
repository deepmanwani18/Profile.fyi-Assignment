import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

const initialState = {
  addedItems: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  state = JSON.parse(localStorage.getItem("cart")) || initialState;
  switch (action.type) {
    case "ADD":
      const updatedItems = [...state.addedItems];
      const itemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        updatedItems[itemIndex].quantity++;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }
      const newTotalAmount =
        (state.totalAmount || 0) + action.payload.price / 100;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          addedItems: updatedItems,
          totalAmount: newTotalAmount,
          resId: action.payload.resId,
        })
      );
      return {
        ...state,
        addedItems: updatedItems,
        totalAmount: newTotalAmount,
        resId: action.payload.resId,
      };
    case "MINUS":
      const newItems = [...state.addedItems];
      const index = newItems.findIndex((item) => item.id === action.payload.id);
      newItems[index].quantity--;
      const updatedAmount = state.totalAmount - action.payload.price / 100 || 0;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          addedItems: newItems,
          totalAmount: updatedAmount,
          resId: action.payload.resId,
        })
      );
      return {
        ...state,
        addedItems: newItems,
        totalAmount: updatedAmount,
        resId: action.payload.resId,
      };
    case "REMOVE":
      const filteredItems = state.addedItems.filter(
        (item) => item.id !== action.payload.id
      );
      const newAmount =
        state.totalAmount -
        (action.payload.price / 100) * action.payload.quantity;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          ...state,
          addedItems: filteredItems,
          totalAmount: newAmount || 0,
          resId: action.payload.resId,
        })
      );
      return {
        ...state,
        addedItems: filteredItems,
        totalAmount: newAmount,
        resId: action.payload.resId,
      };
    case "CLEAR":
      localStorage.setItem("cart", JSON.stringify(initialState));

      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  let cartSize = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartSize = cart.addedItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
  return (
    <cartContext.Provider value={{ cartSize, cartState, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
