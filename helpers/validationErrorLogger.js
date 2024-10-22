import { validationResult } from "express-validator";

// middleware that checks for validation errors and logs them
export const validationErrorLoggerMiddleware = (req, res, next) => {
  console.log("Inside validation middleware");
  const { errors } = validationResult(req);
  if (errors.length) {
    const errorMessages = [];
    errors.forEach((error) => errorMessages.push(error.msg));
    console.log(errorMessages);
    req.flash("error", errorMessages);
    return res.status(400).redirect(req.get("referrer"));
  }
  next();
};
