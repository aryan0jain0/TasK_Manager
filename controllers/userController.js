import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      id: user._id,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600 * 24 * 7,
          }
        );
        res.send({
          id: user._id,
          email: user.email,
          token,
        });
      } else {
        res.status(400).send({
          status: "failed",
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};
