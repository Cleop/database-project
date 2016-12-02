module.exports = (isAuthenticated) => {
  if (isAuthenticated) {
    return '<li class="navbar-link"><a class="style-a" href="/logout">Logout</a></li>';
  }
  return '<li class="navbar-link"><a class="style-a" href="/login">Login</a></li>';
};
