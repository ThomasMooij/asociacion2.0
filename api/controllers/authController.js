import createError from "../middleware/createError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  if(req.presidente != true) {
    next(createError(403, 'not allowed'))
  }
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    createError(next(err));
  }
};

export const login = async (req, res, next) => {
  try {
    //check username
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(404).send("username incorrect");
    // check password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(403).send("password incorrect");
    //sign token
 
    const token = jwt.sign(
      {
        isPresidente: user.presidente,
      },
      process.env.JWT
    );

    const { password, isPresidente, ...info } = user._doc;
   
    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    res.status(200).send({ details: { ...info }, isPresidente});
  } catch (err) {
    createError(next(err));
  }
};
