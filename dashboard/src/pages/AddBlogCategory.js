import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import {
  createBlogCategories,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/blogCategory/blogCategorySlice";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const getbCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdblogcategory,
    blogTitle,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getbCatId !== undefined) {
      dispatch(getBlogCategory(getbCatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getbCatId]);

  useEffect(() => {
    if (isSuccess && createdblogcategory) {
      toast.success("Blog Category Created Successfully");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully");
      Navigate("/admin/blog-category-list")
    }
    if (isError) {
      toast.error("Failed To Blog Category Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdblogcategory]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Blog Category Title is Required"),
    }),
    onSubmit: (values) => {
      if (getbCatId !== undefined) {
       const data = { id: getbCatId, blogCatData: values };
        dispatch(updateBlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategories(values));
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
        {getbCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              name="title"
              placeholder="Enter Blog Category"
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
            {getbCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
