import React from 'react'
import Meta from '../components/Meta'
import BrreadCrumb from '../components/BrreadCrumb'

const TermsAndServices = () => {
  return (
    <>
    <Meta title={"TermsAndServices "} />
    <BrreadCrumb title="Terms And Services" />
    <div className="home-wrapper-2 py-5 login-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h5 className="text-center ">Terms And Serives</h5>
              <div className="login-card">
              Welcome to [Your Company Name]. By using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully, as they govern your use of our services.<br/>
              <h6 className='specialstyle mt-2'>
              Acceptance of Terms:
              </h6>

 By accessing or using our website, you agree to follow and be bound by these terms and conditions. If you disagree with any part, you may not access or use our services.
<h6  className="specialstyle mb-3">
User Accounts:
</h6>
 To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
<h6 className="specialstyle mb-3">
Intellectual Property:
</h6>
 All content on this site, including text, graphics, logos, and images, is our property or licensed to us and is protected by copyright and trademark laws. You may not use any of our intellectual property without prior written permission.
<h6 className="specialstyle mb-3">
Prohibited Conduct:
</h6>
 You agree not to engage in activities that violate any laws, infringe on others' rights, or interfere with our website's operation, including but not limited to hacking, transmitting viruses, or attempting unauthorized access.
<h6  className="specialstyle mb-3">
Product and Service Availability:
</h6>
 We strive to ensure the availability of our products and services; however, availability is not guaranteed. We reserve the right to discontinue or alter our offerings at any time.
<h6  className="specialstyle mb-3">
Limitation of Liability:
</h6>
 We are not liable for any damages that arise from the use or inability to use our website or services, except as required by law.
<h6  className="specialstyle mb-3">
Governing Law:
</h6>
 These terms and conditions are governed by the laws of [your location]. Any disputes shall be resolved in accordance with these laws.
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default TermsAndServices
