module.exports = (isAuthenticated) => {
  if (isAuthenticated) {
    return '<li class="navbar-link"><a href="/logout">Logout</a></li>';
  }
  return '<li class="navbar-link"><a href="/login">Login</a></li>';
};
