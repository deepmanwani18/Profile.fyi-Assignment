import { useCart } from "../utils/CartContext";

const Cart = () => {
  console.log(useCart())
  const {cartState} = useCart();
  console.log(cartState);
  return <div>
    {cartState.addedItems.map(i => {
        return <div key={i.id}>
            <h1>{i.item}: {i.price / 100}  * {i.quantity}</h1>
        </div>
    })}
  </div>;
};

export default Cart;
