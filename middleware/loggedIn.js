module.exports = function isLoggedIn (req, res, next) {
  if (!(sess && sess.user)) {
    return res.redirect('/login');
  }
  next();
}