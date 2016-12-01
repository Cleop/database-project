module.exports = (isFiltered) => {
  if (isFiltered) {
    return '<a href="/resources">All resources</a>'
  }
  return '<a href="/resources?reviewed=true">Filter by reviewed resources</a>';
};
