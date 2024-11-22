import React from "react";
import CustomInput from "../Components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5 " style={{ background: "#ffd333" ,minHeight:"100vh"}}>
      <br />
      <br /><br /><br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Rest Password</h3>
        <p className="text-center">Please Enter your new password</p>
        <form action="">
          <CustomInput
            type="password"
            label="New Password"
            id="password"
            className=""
          />
           <CustomInput
            type="passwird"
            label="Confirm Password"
            id="confpassword"
            className=""
          />
        
          <button
            className="border-0 text-white w-100 mt-2 p-2"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;