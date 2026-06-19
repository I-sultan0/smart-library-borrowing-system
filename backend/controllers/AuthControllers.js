import { createUser, loginUser } from "../services/AuthService.js";
import { getProfileData } from "../services/ProfileService.js";
import generateToken from "../utils/generateToken.js";

export const signupCtrl = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = generateToken(user._id.toString());
    res.status(201).json({
      message: "Signup Successful",
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginCtrl = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    const token = generateToken(user._id.toString());
    res.status(200).json({
      message: "Login Successful",
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const profileCtrl = async (req, res) => {
  try {
    const profile = await getProfileData(req.user._id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
