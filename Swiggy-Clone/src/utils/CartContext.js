import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

const initialState = {
  addedItems: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  console.log(state, "state", action, "action");
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
      const newTotalAmount = state.totalAmount + action.payload.price / 100;
      console.log({
        ...state,
        addedItems: updatedItems,
        totalAmount: newTotalAmount,
      });
      return {
        ...state,
        addedItems: updatedItems,
        totalAmount: newTotalAmount,
      };
    case "MINUS":
      const newItems = [...state.addedItems];
      const index = newItems.findIndex((item) => item.id === action.payload.id);
      newItems[index].quantity--;
      const updatedAmount = state.totalAmount - action.payload.price / 100;

      return {
        ...state,
        addedItems: newItems,
        totalAmount: updatedAmount,
      };
    case "REMOVE":
      const filteredItems = state.addedItems.filter(
        (item) => item.id !== action.payload.id
      );
      const newAmount =
        state.totalAmount - action.payload.price * action.payload.quantity;
      return {
        ...state,
        addedItems: filteredItems,
        totalAmount: newAmount,
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <cartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
