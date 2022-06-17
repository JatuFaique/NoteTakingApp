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
      return {
        ...state,
        login: true,
        token: action.payload.token,
        userDetail: action.payload.email,
      };
    case "FAILED_LOGIN":
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
      return {
        ...state,
        login: true,
        token: action.payload.token,
        userDetail: action.payload.email,
      };

    case "VALIDATION_ERROR":
      return {
        errorMessage: action.payload,
      };
    case "LOGOUT":
      return {
        login: false,
      };

    default:
      return state;
  }
}
export default authReducer;
