const requireAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (user.role !== "admin" && user.role !== "super-admin") {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }

  next();
};

export default requireAdmin;
