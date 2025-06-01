import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart , updateQuantity} from "../store/cartSlice";
import "./Cart.css"; 

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  const handleIncrement = (item) => {
    if (item.quantity < item.stock) {
      dispatch(addToCart(item));
    } else {
      alert(`Cannot add more ${item.title}: stock limit reached`);
    }
  };

const handleDecrement = (item) => {
  if (item.quantity > 1) {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  } else {
    dispatch(removeFromCart(item.id));
  }
};

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <p className="item-title">{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.toFixed(2)}</p>
                <p>Subtotal: {(item.price * item.quantity).toFixed(2)}</p>
                {/* <p>Stock: {item.stock}</p> */}
                <div className="quantity-buttons">
                  <button
                    className="btn"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    -
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn-remove"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <p className="total-price">Total: {totalPrice.toFixed(2)}</p>
            <button
              className="btn-clear"
              onClick={handleClearCart}
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
