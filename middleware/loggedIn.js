module.exports = function isLoggedIn (req, res, next) {
  if (!(req.session.isLoggedIn && req.session.usr)) {
    return res.redirect('/login');
  }
  next();
}