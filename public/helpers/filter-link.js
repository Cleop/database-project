module.exports = (isFiltered) => {
  if (isFiltered) {
    return '<a href="/resources class="style-a"">All resources</a>'
  }
  return '<a href="/resources?reviewed=true class="style-a"">Filter by reviewed resources</a>';
};
