import jwt from "jsonwebtoken";
import { createSession } from "../model/session/SessionModel.js";
import { updateUser } from "../model/user/UserModel.js";

export const signAccessJWT = async (payload) => {
  // const token = jwt.sign(payload, process.env.ACCESS_JWT, { expiresIn: "30m" });
  const token = jwt.sign(payload, "dsfdsfertdfg5645", { expiresIn: "30m" });

  // store access token in session table so access token change everytime user login
  await createSession({ token });
  return token;
};

export const signRefreshJWT = async (payload) => {
  // const token = jwt.sign(payload, process.env.REFERSH_JWT, {
  //   expiresIn: "30d",
  // });
  const token = jwt.sign(payload, "dsfsdf564jgsjjHDHDH", { expiresIn: "30d" });

  await updateUser(payload, { refreshJWT: token });
  return token;
};

export const verifyAccessJWT = (token) => {
  try {
    // return jwt.verify(token, process.env.ACCESS_JWT);
    return jwt.verify(token, "dsfdsfertdfg5645");
  } catch (error) {
    return error.message;
  }
};

export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFERSH_JWT);
  } catch (error) {
    throw error.message;
  }
};
