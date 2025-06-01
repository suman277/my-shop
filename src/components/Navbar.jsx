import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-title">🛍️ My Shop</span>
      </Link>

      <Link
        to="/cart"
        className="cart-button"
        aria-label={`View cart with ${cartItems.length} items`}
      >
        <FiShoppingCart size={20} className="cart-icon" />
        <span className="cart-text">Cart</span>
        {cartItems.length > 0 && (
          <span className="cart-badge">
            {cartItems.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
