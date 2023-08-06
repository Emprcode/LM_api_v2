import { getSession } from "../model/session/SessionModel.js";
import { getUserByEmail } from "../model/user/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const userAuth = async (req, res, next) => {
  try {
    //get access JWT

    const { authorization } = req.headers;

    //check if it is valid and decode it
    // const decodedToken = await verifyAccessJWT(authorization);
    const { email } = await verifyAccessJWT(authorization);
    if (email) {
      //check if email is in db using session table

      // const session = await getSession({token: authorization})
      const { _id } = await getSession({ token: authorization });

      if (_id) {
        //check if the user exist from userModel

        const user = await getUserByEmail(email);
        if (user?._id && user?.status === "active") {
          user.password = undefined;
          req.userInfo = user;
          next();
        }
      }
    }
    res.status(403).json({
      status: "error",
      message: "Unauthorize",
    });
  } catch (error) {
    next(error);
  }
};
