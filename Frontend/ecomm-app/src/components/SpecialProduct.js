import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = ({ product }) => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img
              src={
                product?.images[0]?.url
                  ? product?.images[0]?.url
                  : "images/watch.jpg"
              }
              className="img-fluid"
              alt="watch"
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{product?.brand}</h5>
            <h6 className="title">{product?.title}</h6>
            <ReactStars
              count={5}
              value={Number(product?.totalRating)}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">${product?.price}</span>&nbsp;{" "}
              <strike>$200.00</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5</b>Days
              </p>
              <div className="d-flex align-items-center gap-10">
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>:
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>
            </div>

            <div className="product-count my-3">
              <p>Products: {product?.quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width:
                      product?.quantity / product?.quantity +
                      product?.sold * 100 +
                      "%",
                  }}
                  aria-valuenow={
                    product?.quantity / product?.quantity + product?.sold * 100
                  }
                  aria-valuemin={product?.quantity}
                  aria-valuemax={product?.sold + product?.quantity}
                ></div>
              </div>
            </div>
            <Link className="button" to={`/product/${product?._id}`}>View</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
