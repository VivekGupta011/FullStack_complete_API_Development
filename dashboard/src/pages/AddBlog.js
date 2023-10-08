import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";
import { deleteImage, uploadImg } from "../features/upload/uploadSlice";
import {
  createBlogs,
  getBlog,
  resetState,
  updateBlog,
} from "../features/blog/blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogId]);
  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);
  const blogCategory = useSelector(
    (state) => state.blogCategory.blogcategories
  );
  const newBlog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isPending,
    createdBlog,
    blogName,
    blogDescription,
    blogCategoryTitle,
    blogImage,
    updatedBlog,
  } = newBlog;
  const imgState = useSelector((state) => state.upload.images);
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Created Successfully");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully");
      Navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Failed To Create Blog Something Went Wrong");
    }
  }, [isSuccess, isError, isPending, createdBlog]);

  const img = [];
  imgState.forEach((image) => {
    img.push({
      public_id: image.public_id,
      url: image.url,
    });
  });
  // useEffect(() => {
  //   formik.values.image = img;
  // }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategoryTitle || "",
      image: img || blogImage?.url || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Blog Title is Required"),
      description: Yup.string().required("Blog Description is Required"),
      category: Yup.string().required("Blog Category is Required"),
    }),
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
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
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="bg-white border-1 p-5 mt-3 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {
             blogImage?.url !== undefined ? (<img src={blogImage?.url} alt={blogImage?.url} width={150} height={150} />) : ""
            }
            {imgState.map((img, imgIndex) => (
              <div className="position-relative" key={imgIndex}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteImage(img.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "5px", right: "5px" }}
                ></button>
                <img src={img?.url} alt="" width={150} height={150} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <CustomInput
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              change={formik.handleChange}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <select
            className="form-select py-3 mt-3"
            name="category"
            onChange={formik.handleChange}
          >
            <option
              value={
                formik.values.category !== ""
                  ? formik.values.category
                  : "Select Blog Category"
              }
            >
              {formik.values.category !== ""
                ? formik.values.category
                : "Select Blog Category"}
            </option>

            {blogCategory.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <ReactQuill
            className="mt-3"
            theme="snow"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
