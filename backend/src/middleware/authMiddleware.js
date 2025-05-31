import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment');
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // sets { id, role } from your login payload
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;
