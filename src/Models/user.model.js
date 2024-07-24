import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
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
    },

    password: {
      type: String,
      required: true,
    },
    refreshtoken: {
      type: String,
    },
    islogin: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this?._id,
      firstname: this?.firstname,
      lastname: this.lastname,
      password: this?.password,
      email: this?.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this?._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

export const USER = mongoose.model("USER", userSchema);
