import express from "express";
import { createUser, getUserByEmail } from "../model/user/UserModel.js";
import { comparePassword, hashPassword } from "../middlewares/bcryptHelper.js";

const router = express.Router();

//registration
router.post("/", async (req, res, next) => {
  try {
    //check if user exist
    const { email } = req.body;

    const userExist = await getUserByEmail(email);

    if (userExist) {
      return res.json({
        status: "error",
        message: "User already exist with is email, Please use different email",
      });
    }

    //hash password
    const hassPass = hashPassword(req.body.password);
    if (hassPass) {
      req.body.password = hassPass;
    }

    const result = await createUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "User created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create user, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

//login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (user?._id) {
      const isPassMatch = comparePassword(password, user.password);
      if (isPassMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "Login successful",
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "Unable to login, Please try again later",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
