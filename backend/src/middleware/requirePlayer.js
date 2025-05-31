const requirePlayer = (req, res, next) => {
  // Make sure user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized - user not found' });
  }

  // Check for player membership
  if (req.user.membership_type !== 'player') {
    return res.status(403).json({ error: 'Access restricted to players only' });
  }

  next(); // Allow request to continue
};

export default requirePlayer;
