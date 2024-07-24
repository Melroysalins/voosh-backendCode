import { USER } from "../Models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const checkUserExist = await USER.findOne({
      $or: [{ email }],
    });

    if (checkUserExist) {
      return res.status(401).json({
        message:
          "This email is already registered.Please use a different email or login",
      });
    }

    const createUser = await USER.create({
      _id: this?._id,
      firstname,
      lastname,
      email,
      password,
      islogin: true,
    });

    const userInfo = await USER.findById(createUser?._id);

    if (!userInfo) {
      return res.status(400).json({
        message: "Something went wrong. Failed to register user",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User registered successfully",
      userInfo,
    });
  } catch (error) {
    console.log("Failed to register user", error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUserExist = await USER.findOne({
      $or: [{ email }, { password }],
    });

    if (!checkUserExist) {
      return res.status(401).send({
        message: "Email doesn't exist",
      });
    }
    const isPasswordValid = await checkUserExist.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 400,
        message: "Password don't match",
      });
    }

    const userInfo = await USER.findById(checkUserExist?._id);
    userInfo.islogin = true;

    await userInfo.save();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).send({
      status: 200,
      message: "user logged in successfully",
      userInfo,
      refreshtoken,
      accesstoken,
    });
  } catch (error) {
    console.log("Failed to login user", error);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { _id, password } = req.body;

    const checkUserExist = await USER.findById(_id);

    if (!checkUserExist) {
      return res.status(401).json({
        message: "User doesn't exist",
      });
    }

    checkUserExist.password = password;

    await checkUserExist.save();

    return res.status(200).json({
      status: 200,
      message: "Password has been changed successfully",
    });
  } catch (error) {
    console.log("Failed to change password", error);
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;

    const userInfo = await USER.findById(_id);

    if (!userInfo) {
      return res.status(400).json({
        status: 400,
        message: "Invalid user credentials",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "user details fetched successfully",
      userInfo,
    });
  } catch (error) {
    console.log("Error while getting user data", error);
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    const userLogout = await USER.findById(_id);

    userLogout.islogin = false;

    await userLogout.save();

    return res.status(200).json({
      status: 200,
      message: "successfully logged out",
    });
  } catch (error) {
    console.log("Error , while logging out", error);
  }
});

export { registerUser, loginUser, changePassword, getUserInfo, logOutUser };
