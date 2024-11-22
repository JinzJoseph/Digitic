
import React from "react";
import CustomInput from "../Components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5 " style={{ background: "#ffd333" ,minHeight:"100vh"}}>
      <br />
      <br /><br /><br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">Please Enter your register email</p>
        <form action="">
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            className="p-1"
          />
        
          <button
            className="border-0 text-white w-100 mt-2 p-2"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
