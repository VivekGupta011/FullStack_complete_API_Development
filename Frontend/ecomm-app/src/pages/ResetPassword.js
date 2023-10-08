import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../features/user/userSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  console.log(getToken);

  const formik = useFormik({
    initialValues: {
      password: "",
    //   confpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    //   confpassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
        //const data = {token: getToken, newPassword: values}
      dispatch(changePassword({token: getToken, password: values.password }))
      //navigate('/login')
    },
  });
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title="Reset Password" />
      <Container class1="resetpassword-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  change={formik.handleChange("password")}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div className="error text-danger text-center">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                {/* <CustomInput
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                  className="form-control"
                  change={formik.handleChange("confpassword")}
                  onBlur={formik.handleBlur}
                  value={formik.values.confpassword}
                />
                <div className="error text-danger text-center">
                  {formik.touched.confpassword && formik.errors.confpassword ? (
                    <div>{formik.errors.confpassword}</div>
                  ) : null}
                </div> */}
                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Change Password
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

export default ResetPassword;
