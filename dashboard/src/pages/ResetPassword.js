import React from 'react';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
  return (
    <div className="py-5 d-flex flex-column justify-content-center" style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}>
    <div className="mx-auto w-25 bg-white rounded-3 p-4">
      <h3 className="text-center title">Reset Password</h3>
      <p className="text-center">Please enter your new password.</p>
      <form action="">
        <CustomInput
          type="password"
          name="password"
          placeholder="New Password"
          id="floatingPassword"
        />
        <CustomInput
          type="password"
          name="confpassword"
          placeholder="Confirm Password"
          id="floatingConfPassword"
        />
        <button
          className="border-0 px-3 py-2 text-white fw-bold w-100"
          style={{ backgroundColor: "#ffd333" }}
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  </div>
  );
}

export default ResetPassword;
