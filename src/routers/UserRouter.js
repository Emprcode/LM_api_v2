import express from "express";
import { createUser, getUserByEmail } from "../model/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcryptHelper.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import { userAuth } from "../middlewares/authMiddleware.js";

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
    console.log(req.body)
    if (user?._id) {
      const isPassMatch = comparePassword(password, user.password);
      if (isPassMatch) {
     const tokens ={
      accessJWT : await signAccessJWT({email}),
      refreshJWT : await signRefreshJWT({email})
     }
     console.log(tokens)
        return res.json({
          status: "success",
          message: "Login successful",
          tokens,
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


//get userInfo after authorization for frontend use

router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status:"success",
      user : req.userInfo
    })
  } catch (error) {
    next(error)
    
  }
})

export default router;
