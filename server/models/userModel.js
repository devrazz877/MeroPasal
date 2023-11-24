import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "please fill fullname"],
    },
    email: {
      type: String,
      required: [true, "pls enter your email"],
      unique: [true, "email already exists"],
    },
    mobileNo: {
      type: String,
      required: [true, "pls enter your mobile number"],
      unique: [true, "mobile no already exists"],
    },
    password: {
      type: String,
      required: [true, "pls enter your password"],
      select: false,
    },
    avatar: {
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

//hash password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//generate Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

const User = new mongoose.model("user", userSchema);

export default User;
