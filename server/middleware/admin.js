let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send('You do have a permission to do this.');
  }
  next();
};

module.exports = { admin };
