const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_SfzQaEEcWgXT3Z",
  key_secret: "7nBCtHu1UDd8rHXI3m0oprVc",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  try {
    const option = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};
const paymentVerification = async (req, res) => {
  console.log(req.body);
  try {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({
      razorpayOrderId,
      razorpayPaymentId,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkout,
  paymentVerification,
};
