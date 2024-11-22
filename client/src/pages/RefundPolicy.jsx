import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";

const RefundPolicy = () => {
  return (
    <>
      <Meta title={"RefundPolicy "} />
      <BrreadCrumb title="Refund Policy" />
      <div className="home-wrapper-2 py-5 login-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h5 className="text-center ">Refund Policy</h5>
              <div className="login-card">
                Our goal is to ensure you're completely satisfied with your
                purchase. If, for any reason, you're not happy with your order,
                we offer a hassle-free refund policy.<br></br>
                <h6 className="specialstyle mt-3">Eligibility </h6> : Refunds are available for purchases made
                within [specific timeframe, e.g., 30 days] of purchase, provided
                items are returned in original condition. <br />
                <h6 className="specialstyle mt-3">Process </h6>: To initiate a refund, please contact our
                customer support team at [contact info]. Once approved, you will
                receive further instructions on returning the item.
                <h6 className="specialstyle mt-3">Refund Method </h6>: Refunds will be processed to the
                original payment method within [number of days] of receiving the
                returned product.
                <h6 className="specialstyle mt-3">Exclusions:</h6>
                Certain items, such as [customized, final sale, or perishable
                items], may not be eligible for a refund.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
