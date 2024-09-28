module.exports = function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // Assuming req.user.role is set by verifyToken middleware

    console.log(`User role: ${userRole}`);
    console.log(`Allowed roles: ${allowedRoles}`);

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: `Access denied. ${userRole} not allowed` });
    }

    next();
  };
};
