/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* ===========================
   404 NOT FOUND MIDDLEWARE
=========================== */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
