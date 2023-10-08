import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";

const WishList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, [dispatch]);
  const userWishListState = useSelector(
    (state) => state.auth.userWishlist?.wishlist
  );

  const removeFromWishlist = (prodId) => {
    dispatch(addToWishList(prodId));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {userWishListState && userWishListState?.length === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {userWishListState && userWishListState?.map((wishlist) => (
            <div className="col-3" key={wishlist?._id}>
              <div className="wishlist-card position-relative">
                <img
                  onClick={() => removeFromWishlist(wishlist?._id)}
                  src="images/cross.svg"
                  className="position-absolute cross img-fluid"
                  alt="cross"
                />
                <div className="wishlist-card-image bg-white">
                  <img
                    src={
                      wishlist?.images[0]?.url
                        ? wishlist?.images[0]?.url
                        : "images/watch.jpg"
                    }
                    className="img-fluid  d-block mx-auto"
                    alt="watch"
                    width={160}
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">{wishlist?.title}</h5>
                  <h6 className="price">${wishlist?.price}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default WishList;
