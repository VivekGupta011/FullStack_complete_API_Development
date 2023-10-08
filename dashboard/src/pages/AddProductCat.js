import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import {
  createProductCategories,
  getProductCategoryById,
  resetState,
  updateProductCategory,
} from "../features/productCategory/productCategorySlice";

const AddProductCat = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    categoryName,
    updatedPCategory,
  } = newCategory;
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getProductCategoryById(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPCatId]);
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Created Successfully");
    }
    if(isSuccess && updatedPCategory){
      toast.success("Product Category Updated Successfully");
      Navigate('/admin/category-list')
    }
    if (isError) {
      toast.error("Failed To Create Product Category Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdProductCategory, updatedPCategory, Navigate]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Product Category Name is Required"),
    }),
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, categoryData: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              name="title"
              placeholder="Enter Product Category"
              change={formik.handleChange("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            {getPCatId !== undefined ? "Edit" : "Add"} Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCat;
