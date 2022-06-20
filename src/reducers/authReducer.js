import { toast } from "react-toastify";

export const initialState = {
  login: false,
  loading: true,
  token: "",
  errorMessage: null,
  userDetail: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS_LOGIN":
      toast.success("Login Successful");
      return {
        ...state,
        login: true,
        token: action.payload.token,
        userDetail: action.payload.email,
      };
    case "FAILED_LOGIN":
      toast.warn("Login Failed");
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case "REQUEST_SIGNUP":
      return {
        ...state,
        loading: true,
      };
    case "SIGNUP_SUCCESS":
      toast.success("Signup Succesfull");
      return {
        ...state,
        login: true,
        token: action.payload.token,
        userDetail: action.payload.email,
      };

    case "VALIDATION_ERROR":
      toast.warn(`${action.payload}`);
      return {
        errorMessage: action.payload,
      };
    case "LOGOUT":
      toast.success("Logout Successfull");
      return {
        login: false,
      };

    default:
      return state;
  }
}
export default authReducer;
