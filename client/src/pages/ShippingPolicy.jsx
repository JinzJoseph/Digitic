import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"ShippingPolicy "} />
      <BrreadCrumb title="Shipping Policy" />
      <div className="home-wrapper-2 py-5 login-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h5 className="text-center ">Shipping Policy</h5>
              <div className="login-card">
                We aim to deliver your order as quickly and efficiently as
                possible. Below are the details regarding our shipping process,
                timelines, and charges.
                <br />
                <h6 className="specialstyle mt-3">Processing Time </h6> : Orders
                are typically processed within [1-3 business days] of purchase.
                Once your order is processed, you will receive a confirmation
                email with your tracking information. <br />{" "}
                <h6 className=" specialstyle mt-3">
                  Shipping Methods & Times:{" "}
                </h6>{" "}
                Standard Shipping: Estimated delivery within [5-7 business
                days]. Expedited Shipping: Estimated delivery within [2-3
                business days]. International Shipping: Available in select
                regions with delivery times ranging from [7-21 business days].
                <br />
                <h6 className="specialstyle mt-3"> Shipping Costs </h6>:
                Shipping costs are calculated at checkout based on location and
                selected shipping method. Free standard shipping is available on
                orders over [$XX]. <br />
                <h6 className="specialstyle mt-3">International Orders:</h6>
                For international orders, please note that customs fees or
                import taxes may apply. The customer is responsible for these
                charges upon delivery. <br />
                <h6 className="specialstyle mt-3">Delivery Issues:</h6>
                If you experience any issues with your delivery, such as delays
                or lost packages, please contact our customer service team at
                [contact info], and we’ll be happy to assist you. Thank you for
                choosing us! We’re committed to getting your order to you as
                smoothly as possible.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
