import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProducts } from "../store/ProductSlices";
import { addToCart } from "../store/cartSlice";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products || {}
  );

  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    dispatch(showProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedMessage(`Added "${product.title}" to cart`);
    setTimeout(() => setAddedMessage(""), 2500);
  };

  if (loading) return <p className="status-text">Loading...</p>;
  if (error) return <p className="status-text error">Error: {error}</p>;
  if (!products || !Array.isArray(products)) return <p>No products available</p>;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search products"
        />
        <div className="view-buttons">
          <button
            className={`view-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => setView("grid")}
            aria-label="Switch to grid view"
          >
            Grid View
          </button>
          <button
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
            aria-label="Switch to list view"
          >
            List View
          </button>
        </div>
      </div>

      {addedMessage && <p className="added-message">{addedMessage}</p>}

      <div className={view === "grid" ? "grid-view" : "list-view"}>
        {filteredProducts.length === 0 ? (
          <p>No products match your search.</p>
        ) : (
          filteredProducts.map((product, index) =>
            view === "list" ? (
              <div
                key={product.id}
                className={`list-item ${product.stock === 0 ? "out-of-stock" : ""}`}
              >
                <span className="serial-number">{index + 1}.</span>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="list-image"
                />
                <div className="list-details">
                  <p className="product-title">{product.title}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                </div>
                <button
                  className="add-to-cart"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            ) : (
              <div
                key={product.id}
                className={`product-card ${product.stock === 0 ? "out-of-stock" : ""}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="grid-image"
                />
                <h3>{product.title}</h3>
                <p className="price">{product.price.toFixed(2)}</p>
                <p className="stock">Stock: {product.stock}</p>
                <button
                  className="add-to-cart"
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Products;
