import React from "react";
import Meta from "../components/Meta";
import BrreadCrumb from "../components/BrreadCrumb";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Privacy Policy "} />
      <BrreadCrumb title="Privacy Policy" />
      <div className="home-wrapper-2 py-5 login-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h5 className="text-center ">Privacy Policy</h5>
              <div className="login-card">
                Ensuring your website design has a privacy policy page protects
                your business from breaking the law and builds trust. At the
                time of this article, there are no federal laws mandating the
                use of a website privacy policy. However, entities that collect
                personal information could find themselves adhering to state
                laws aimed at protecting consumer privacy and consumer rights
                laws enabled by the Federal Trade Commission (FTC),<br></br> which
                regulates consumer data protection in the United States. One
                only needs to consult their internet search engine to realize
                the costliness of privacy disputes. Whether the company is in
                the right or not, the expense of litigation is reason enough to
                take preemptive measures in privacy matters. Any website
                collecting personal data to identify an individual must provide
                a privacy policy as international laws require. Many third party
                sites, such as commercial selling platforms and others, must
                have a privacy policy, which protects their third-party
                interest. Protective measures like privacy policies build
                goodwill with clients and ultimately attract more business,
                leading to greater profits and income. In general, keeping a
                website privacy policy is an excellent idea for remaining
                compliant with various laws and rules.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
