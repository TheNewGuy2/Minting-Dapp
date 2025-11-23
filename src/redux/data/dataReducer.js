// src/redux/data/dataReducer.js

const initialState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  balance: 0,   // NEW: per-account token balance
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        balance: action.payload.balance ?? 0, // ensure defined
        // cost: action.payload.cost,  // still commented out as before
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
