import { toast } from "react-toastify";

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
      toast.success("Notes Updated");
      return {
        ...state,
        notes: action.payload,
      };
    case "FAILED_ADD_TO_NOTES":
      toast.warn("Notes update Failed");
      return {
        ...state,
      };
    case "REMOVE_FROM_NOTES":
      toast.success("Remove Successful");
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
      toast.success("Added to archive");
      return {
        ...state,
        notes: action.payload.notes,
        archives: action.payload.archives,
      };
    case "FAILED_ADD_TO_ARCHIVE":
      toast.warn("Something went wrong");
      return {
        ...state,
      };
    case "REMOVE_FROM_ARCHIVE":
      toast.success("Archive removed");
      return {
        ...state,
        archives: action.payload.archives,
      };
    case "RESTORE_FROM_ARCHIVE":
      toast.success("Restore successfull");
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
      toast.success("Added to trash");
      console.log("oy", action.payload);
      return {
        ...state,
        notes: action.payload.notes,
        trash: action.payload.trash,
      };
    case "FAILED_ADD_TO_TRASH":
      toast.warn("SOmething went wrong");
      return {
        ...state,
      };
    case "REMOVE_FROM_TRASH":
      toast.success("Removed from trash");
      return {
        ...state,
        trash: action.payload.trash,
      };
    case "RESTORE_FROM_TRASH":
      toast.success("Removed from trash");
      return {
        ...state,
        trash: action.payload.trash,
        notes: action.payload.notes,
      };

    case "CLEAR_NOTES":
      return {
        notes: [],
        trash: [],
        archives: [],
      };

    default:
      return state;
  }
}

export default notesReducer;
