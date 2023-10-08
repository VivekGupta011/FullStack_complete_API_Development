import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";


const Profile = () => {
    const[edit, setEdit] = useState(true)
    const dispatch = useDispatch()
    const userState = useSelector((state) => state?.auth?.user)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: userState && userState?.firstname,
          lastname: userState && userState?.lastname,
          email: userState && userState?.email,
          mobile: userState && userState?.mobile,
        },
        validationSchema: Yup.object({
          firstname: Yup.string().required("First Name is Required"),
          lastname: Yup.string().required("Last Name is Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is Required"),
          mobile: Yup.string().required("Mobile Number Required"),
        }),
        onSubmit: (values) => {
        //   alert(JSON.stringify(values, null, 2));
        dispatch(updateUser(values))
        setEdit(true)
        },
      });
  return (
    <>
      <Meta title="Profile" />
      <BreadCrumb title="My Profile" />
      <Container class1="profile-wrapper home-wrapper-2 py-5">
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-dark my-3">Update Profile</h3>
                <FiEdit className="fs-3" style={{ cursor: "pointer"}} onClick={() => {setEdit(false)}} />
                </div>
            </div>
          <div className="col-12">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Firstname</label>
                <CustomInput
                  type="text"
                  className="form-control"
                  name="firstname"
                  placeholder="First Name"
                  change={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  disabled={edit}
                />
                 <div className="error text-danger">
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div>{formik.errors.firstname}</div>
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Lastname</label>
                <CustomInput
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="Last Name"
                  change={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  disabled={edit}
                />
                 <div className="error text-danger">
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div>{formik.errors.lastname}</div>
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <CustomInput
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  change={formik.handleChange("email")}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={edit}
                />
                 <div className="error text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <CustomInput
                  type="text"
                  className="form-control"
                  name="mobile"
                  placeholder="Mobile Number"
                  change={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  disabled={edit}
                />
                 <div className="error text-danger">
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>
              </div>
              {
                edit===false &&  <button className="button">Update</button>
                
              }
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
