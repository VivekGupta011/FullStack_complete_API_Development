import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const authState = useSelector((state) => state?.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is Required"),
      lastname: Yup.string().required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      mobile: Yup.string().required("Mobile Number Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values))
    },
  });
  useEffect(() => {
    if(authState?.createdUser !==undefined && authState?.isError === false){
      navigate("/login")
    }
  },[authState])
  return (
    <>
      <Meta title="Signup" />
      <BreadCrumb title="Signup" />
      <Container class1="signup-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="form-control"
                  change={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                <div className="error text-danger">
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control"
                  change={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />
                <div className="error text-danger">
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  change={formik.handleChange("email")}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <div className="error text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  className="form-control"
                  change={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                />
                <div className="error text-danger">
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>

                <div className="mt-1">
                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    change={formik.handleChange("password")}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                <div className="error text-danger">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
