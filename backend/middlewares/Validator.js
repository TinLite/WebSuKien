import { body } from "express-validator";

export const validatorLogin = () =>
  body("email").isEmail().isEmpty().withMessage("Email is invalid")
    // body("password")
    //   .isLength({ min: 3 })
    //   .withMessage("Password must be at least 3 characters");

