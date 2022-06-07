export const initialState = {
  filterbyLabel: [],
  filterByPriority: "HIGH_TO_LOW",
};

function filterReducer(state, action) {
  switch (action.type) {
    case "FILTER_BY_CATEGORY":
      return {
        state,
        filterbyLabel: [...state.filterbyLabel, action.payload],
      };
    case "FILTER_BY_HIGHTOLOW":
      return {
        state,
        filterByPriority: action.payload,
      };

    default:
      return state;
  }
}

export default filterReducer;
