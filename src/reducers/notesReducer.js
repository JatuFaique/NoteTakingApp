export const initialState = {
  notes: [],
  archives: [],
  trash: [],
};

function notesReducer(state, action) {
  switch (action.type) {
    case "REQUEST_ADD_TO_NOTES":
      return {
        ...state,
      };
    case "SUCCESS_ADD_TO_NOTES":
      console.log("oy", action.payload);
      return {
        ...state,
        notes: action.payload,
      };
    case "FAILED_ADD_TO_NOTES":
      return {
        ...state,
      };
    case "REMOVE_FROM_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "REQUEST_ADD_TO_ARCHIVE":
      return {
        ...state,
      };
    case "SUCCESS_ADD_TO_ARCHIVE":
      console.log("oy", action.payload);
      return {
        ...state,
        notes: action.payload.notes,
        archives: action.payload.archives,
      };
    case "FAILED_ADD_TO_ARCHIVE":
      return {
        ...state,
      };
    case "REMOVE_FROM_ARCHIVE":
      return {
        ...state,
        archives: action.payload.archives,
      };
    case "RESTORE_FROM_ARCHIVE":
      return {
        ...state,
        archives: action.payload.archives,
        notes: action.payload.notes,
      };
    case "REQUEST_ADD_TO_TRASH":
      console.log("hello req");
      return {
        ...state,
      };
    case "SUCCESS_ADD_TO_TRASH":
      console.log("oy", action.payload);
      return {
        ...state,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };
    case "FAILED_ADD_TO_TRASH":
      return {
        ...state,
      };
    case "REMOVE_FROM_TRASH":
      return {
        ...state,
        trash: action.payload.trash,
      };
    case "RESTORE_FROM_TRASH":
      return {
        ...state,
        trash: action.payload.trash,
        notes: action.payload.notes,
      };

    default:
      return state;
  }
}

export default notesReducer;
