import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  let userSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if(user){
      Navigate("/admin")
    }else{
      Navigate("/")
    }
  },[Navigate, isSuccess])
  return (
    <div
      className="py-5 d-flex flex-column justify-content-center"
      style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
    >
      <div className="mx-auto w-25 bg-white rounded-3 p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className="error text-center">
          {message.message ==="Rejected" ? "You are not and admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            placeholder="Email Address"
            id="floatingEmail"
            change={formik.handleChange}
            val={formik.values.email}
          />
          <div className="error">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            id="floatingPassword"
            change={formik.handleChange}
            val={formik.values.password}
          />
          <div className="error">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          </div>
          <button
            className="border-0 mt-3 px-3 py-2 text-white text-center text-decoration-none fw-bold w-100"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
