import React from "react";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishList } from "../features/products/productSlice";

const ProductCard = ({ grid, products }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addWishList = (prodId) => {
    dispatch(addToWishList(prodId));
  };
  return (
    <>
  
        <div
          className={`${
            location.pathname === "/product" ? `gr-${grid}` : "col-3"
          }`}
        >
          <div className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <button
                className="border-0 bg-transparent"
                onClick={() => addWishList(products?._id)}
              >
                <img src={wish} alt="wish" />
              </button>
            </div>
            <div className="product-image">
              <img
                src={products?.images[0]?.url}
                className="img-fluid mx-auto"
                width={160}
                alt="watch"
              />
              <img src={watch2} className="img-fluid mx-auto" alt="watch" />
            </div>
            <div className="product-details">
              <h6 className="brand">{products?.brand}</h6>
              <h5 className="product-title">{products?.title}</h5>
              <ReactStars
                count={5}
                value={Number(products?.totalRating)}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
              <p
                className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{ __html: products?.description }}
              ></p>
              <p className="price">${products?.price}</p>
            </div>

            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                <button className="border-0 bg-transparent">
                  <img src={prodcompare} alt="compare" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={view} alt="view" onClick={() => navigate(`/product/${products?._id}`)} />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button>
              </div>
            </div>
          </div>
        </div>
   
    </>
  );
};

export default ProductCard;
