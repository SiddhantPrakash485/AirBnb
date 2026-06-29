import gentoken from "../config/token.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!" });
    }
    let hashpassword = await bcrypt.hash(password, 10);
    let user = await User.create({ name, email, password: hashpassword });
    let token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: (process.env.NODE_ENVIRONMENT = "production"),
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `SIGNUP ERROR ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).populate("listing","title image1 image2 image3 description rent category landmark city");
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user or password!" });
    }
    let token = await gentoken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login Error${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};
