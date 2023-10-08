import React from 'react';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
  return (
        <div className="py-5 d-flex flex-column justify-content-center" style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}>
      <div className="mx-auto w-25 bg-white rounded-3 p-4">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Please enter your email to get reset password mail.</p>
        <form action="">
          <CustomInput
            type="email"
            name="email"
            placeholder="Email Address"
            id="floatingEmail"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
