module.exports = (isFiltered) => {
  if (isFiltered) {
    return '<a href="/resources" class="btn style-a">All resources</a>'
  }
  return '<a href="/resources?reviewed=true" class="btn style-a">Filter by reviewed resources</a>';
};
