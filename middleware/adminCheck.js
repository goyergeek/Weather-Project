module.exports = function adminCheck (req, res, next) {
  if (!(req.session.isLoggedIn && req.session.usr)) {
    return res.redirect('/login');
  }
  if(!(req.session.priv)) {
      return res.redirect('/');
  }
  next();
};
