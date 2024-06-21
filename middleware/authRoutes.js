export const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
export const adminMiddleware = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};
