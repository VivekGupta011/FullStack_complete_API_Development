import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import {
  createCoupons,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } =
    newCoupon;
    let text = couponExpiry
    let couponDateExpiry = text?.substr(0, 10);
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCouponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Created Successfully");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully");
      Navigate('/admin/coupon-list')
    }
    if (isError) {
      toast.error("Failed To Create Coupon Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponDateExpiry || "",
      discount: couponDiscount || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Coupon Name is Required"),
      expiry: Yup.date().required("Coupon Expiry Date is Required"),
      discount: Yup.number().required("Coupon Discount is Required"),
    }),
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              name="name"
              placeholder="Enter Coupon Name"
              change={formik.handleChange("name")}
              val={formik.values.name}
            />
          </div>
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <CustomInput
              type="date"
              name="expiry"
              placeholder="Enter Expiry Date"
              change={formik.handleChange("expiry")}
              val={formik.values.expiry}
            />
          </div>
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry ? (
              <div>{formik.errors.expiry}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <CustomInput
              type="number"
              name="discount"
              placeholder="Enter Coupon Discount"
              change={formik.handleChange("discount")}
              val={formik.values.discount}
            />
          </div>
          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
