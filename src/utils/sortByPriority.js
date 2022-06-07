export const sortByPriority = (notes, filterState) => {
  let priorityArray = ["HIGH", "MEDIUM", "LOW"];
  if (filterState === "HIGH_TO_LOW") {
    const sorted = notes.sort(function (a, b) {
      var firstPrio = priorityArray.indexOf(a.priority);
      var secPrio = priorityArray.indexOf(b.priority);
      return firstPrio - secPrio;
    });
    return sorted;
  } else {
    const sorted = notes.sort(function (a, b) {
      var firstPrio = priorityArray.indexOf(a.priority);
      var secPrio = priorityArray.indexOf(b.priority);
      return secPrio - firstPrio;
    });
    return sorted;
  }
};
