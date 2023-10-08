import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import {
  createColors,
  getColorById,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  //console.log(getColorId)
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor, colorName, updatedColor } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColorById(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Created Successfully");
    }
    if(isSuccess && updatedColor){
      toast.success("Color Updated Successfully");
      Navigate('/admin/color-list')
    }
    if (isError) {
      toast.error("Failed To Color Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const defaultColor = "#ffffff" || "white"
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || defaultColor,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Color Name is Required"),
    }),
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColors(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getColorId !== undefined ? "Edit" : "Add"}Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4 title">
            <CustomInput
              type="color"
              name="title"
              placeholder="Enter Color"
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
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
