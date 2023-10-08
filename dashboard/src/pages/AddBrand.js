import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import { createBrands, getBrand, resetState, updateBrand } from "../features/brand/brandSlice";
import { toast } from "react-toastify"

const AddBrand = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const getBrandId = location.pathname.split("/")[3]
  const newBrand = useSelector((state) => state.brand)
  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;
  useEffect(() => {
    if(getBrandId !== undefined){
      dispatch(getBrand(getBrandId))
    }else{
      dispatch(resetState())
    }
  },[dispatch, getBrandId])

  useEffect(() => {
    if(isSuccess && createdBrand){
      toast.success("Brand Created Successfully")
    }
    if(updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully")
      navigate('/admin/brand-list')
    }
    if(isError){
      toast.error("Failed To Create Brand Something Went Wrong")
    }
  },[isSuccess, isError, isLoading, createdBrand])
 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is Required"),
    }),
    onSubmit: (values) => {
      if(getBrandId !== undefined){
        const data = {id: getBrandId, brandData: values}
        dispatch(updateBrand(data))
        dispatch(resetState())
      }else{
        dispatch(createBrands(values))
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState())
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              name="title"
              placeholder="Enter Brand"
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
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
