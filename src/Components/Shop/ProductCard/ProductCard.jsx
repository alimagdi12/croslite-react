import React from "react";
import ImageLoader from "../../../Components/ImageLoader/ImageLoader";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../Context/Login/LoginContext"; // Import the login context
import addToCart from "../../../services/AddToCart/AddToCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useLogin(); // Use the login context

  const productName =
    i18n.language === "ar" ? product.arabicTitle : product.title; // Conditional title

  function details(e) {
    e.preventDefault();
    navigate(`/product/${product._id}`);
  }

  async function handleAddToCart() {
    const added = await addToCart(product._id); // Use the service function
    if (added) {
      toast.success(t("Product added to cart successfully"));
    } else {
      toast.error(t("Failed to add product to cart"));
    }
  }

  return (
    <div className="product-card">
      <ImageLoader src={product.imageUrl.images[0]} alt={productName} />
      <div className="product-details">
        <h3 className="product-name">{productName}</h3>{" "}
        {/* Render correct title */}
        <div className="button-container">
          <button className="product-details-button" onClick={details}>
            {t("Details")}
          </button>
          {isLoggedIn && (
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              {t("AddToCart")}
              <FontAwesomeIcon icon={faBagShopping} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

