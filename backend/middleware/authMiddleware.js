/* eslint-disable no-undef */
export const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
