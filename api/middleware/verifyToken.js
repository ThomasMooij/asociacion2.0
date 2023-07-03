import jwt from "jsonwebtoken";
import createError from "./createError.js";

export const verifyToken = (req, res, next) => {
  // set token to current cookie
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not logged in"));

  // verify cookie and to next middleware
  jwt.verify(token, process.env.JWT, async (err, payload) => {
    if (err) {
      // Check if the token has expired
      if (err.name === "TokenExpiredError") {
        // Generate a new token
        const newToken = jwt.sign(
          {
            isPresidente: payload.isPresidente,
          },
          process.env.JWT
        );

        // Update the token in the cookie
        res.cookie("accessToken", newToken, {
          httpOnly: true,
        });

        // Assign the new token's payload to the request object
        req.presidente = payload.isPresidente;
        
        // Continue to the next middleware
        next();
      } else {
        return next(createError(403, "Token is not valid"));
      }
    } else {
      // Assign received data to be passed on
      req.presidente = payload.isPresidente;
      next();
    }
  });
};
