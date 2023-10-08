import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import { toast } from "react-toastify";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import { Link } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import { BsHeart } from "react-icons/bs";
import Container from "../components/Container";
import { addRating, getProduct } from "../features/products/productSlice";
import { addToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [star, setStar] = useState(null)
  const [comment, setComment] = useState("")
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getProduct(getProductId));
    dispatch(getUserCart());
  }, [dispatch, getProductId]);

  const singleProduct = useSelector((state) => state?.product?.singleProduct);
  const cartState = useSelector((state) => state?.auth?.cart);
  const productState = useSelector((state) => state?.product?.products);
  const ratingState = useSelector((state) => state.product.rating);
  console.log(ratingState)

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

const addRatingToProduct = (e) => {
  e.preventDefault();
  if(star === null) {
    toast.error("Please add star rating")
    return;
  }
  if(comment === ""){
    toast.error("Please Write Review About The Product")
    return;
  }
  dispatch(addRating({star: star, comment: comment, prodId: getProductId}))
  setTimeout(() => {
    dispatch(getProduct(getProductId));
  },300)
 
}


  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img:
      singleProduct && singleProduct?.images[0]?.url
        ? singleProduct?.images[0]?.url
        : "https://lh3.googleusercontent.com/GNYKKX7q5QAzG4n-MH0qyPEX0WC89arDEfAXwdHKNF_iES9SQF2s74h8usSNpMWgVbzoOwYv3xLAjXrgaAcOrQjV6_LXGbFruIA=s0",
  };
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose color");
      return;
    } else {
      const product = {
        productId: singleProduct?._id,
        quantity: quantity,
        price: singleProduct?.price,
        color: color,
      };
      dispatch(addToCart(product));
      navigate("/cart");
    }
  };
  return (
    <>
      <Meta title={singleProduct?.title} />
      <BreadCrumb title={singleProduct?.title} />
      <Container class1="main-product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-10">
              <div>
                <img
                  src={singleProduct?.images[0]?.url}
                  className="img-fluid"
                  alt={singleProduct?.title}
                />
              </div>
              <div>
                <img
                  src={singleProduct?.images[0]?.url}
                  className="img-fluid"
                  alt={singleProduct?.title}
                />
              </div>
              <div>
                <img
                  src={singleProduct?.images[0]?.url}
                  className="img-fluid"
                  alt={singleProduct?.title}
                />
              </div>
              <div>
                <img
                  src={singleProduct?.images[0]?.url}
                  className="img-fluid"
                  alt={singleProduct?.title}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{singleProduct?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">${singleProduct?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    value={Number(singleProduct?.totalRating)}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Type: </h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Brand: </h3>
                  <p className="product-data">{singleProduct?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Category: </h3>
                  <p className="product-data">{singleProduct?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Tags: </h3>
                  <p className="product-data">{singleProduct?.tags}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="product-heading">Availability: </h3>
                  <p className="product-data">In Stock</p>
                </div>

                <div className="d-flex flex-column gap-10 mt-2 mb-3">
                  <h3 className="product-heading">Size: </h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge bg-white border border-1 text-dark border-secondary">
                      S
                    </span>
                    <span className="badge bg-white border border-1 text-dark border-secondary">
                      M
                    </span>
                    <span className="badge bg-white border border-1 text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge bg-white border border-1 text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex flex-column gap-10 mt-2 mb-3">
                      <h3 className="product-heading">Color: </h3>
                      <Color
                        setColor={setColor}
                        colorData={singleProduct && singleProduct?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity: </h3>
                      <div>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          className="form-control w-80 py-1"
                          name="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={`mt-0 d-flex  align-items-center gap-30 ${
                      alreadyAdded ? "ms-0" : "ms-5"
                    }`}
                  >
                    <button
                      className="button border-0"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                    </button>
                    {/* <Link to="/signup" className="button signup">
                      Buy Now
                    </Link> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="#compare">
                      <SlRefresh className="fs-5 me-2" />
                      Add to Comapre
                    </a>
                  </div>
                  <div>
                    <a href="#wishlist">
                      <BsHeart className="fs-5 me-2" />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column gap-10 my-3">
                  <h3 className="product-heading">Shipping & Returns: </h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> we
                    ship all us domestic orders within{" "}
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex align-items-center gap-10 my-3">
                  <h3 className="product-heading">Product Link: </h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => copyToClipboard(window.location.href)}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <h3 id="review">Reviews</h3>
          <div className="col-12">
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      value={Number(singleProduct?.totalRating)}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Base on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a
                      className="text-dark text-decoration-underline"
                      href="#order"
                    >
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" onSubmit={addRatingToProduct} className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      value={4}
                      edit={true}
                      size={24}
                      activeColor="#ffd700"
                      onChange={(e) => setStar(e)}
                    />
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      id=""
                      cols="30"
                      rows="4"
                      className="form-control"
                      placeholder="Comments"
                      onChange={(e) => { setComment(e.target.value)}}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="button border-0" type="submit">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {
                  singleProduct && singleProduct?.ratings?.map((rating) => (
                    <div className="review" key={rating?._id}>
                    <div className="d-flex align-items-center gap-10">
                      <h6 className="mb-0"></h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value={rating?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="mt-3">
                      {rating?.comment}
                    </p>
                  </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((product) =>
              product?.tags === "featured" ? (
                <ProductCard products={product} key={product?._id} />
              ) : (
                ""
              )
            )}
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
