export const sortByRecent = (notes, filterState) => {
  if (filterState == "RECENT_FIRST") {
    const sorted = notes
      .slice()
      .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    return sorted;
  } else {
    const sorted = notes
      .slice()
      .sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
    return sorted;
  }
};
