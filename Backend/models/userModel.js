const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const saltRounds = 10; // You need to define saltRounds
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address:{
      type:String
    },
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },passwordChangedAt:{
      type:Date
    },
    passwordResetToken:{
      type:String
    },
    passwordResetExpires:{
      type:Date
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.createPasswordResetToken=async function (){
  const resettoken=crypto.randomBytes(32).toString("hex");
  this.passwordResetToken=crypto.createHash("sha256").update(resettoken).digest("hex");
  this.passwordResetExpires=Date.now() +30 * 60 * 1000;
  return resettoken;
}

// Export the model
module.exports = mongoose.model("User", userSchema);
