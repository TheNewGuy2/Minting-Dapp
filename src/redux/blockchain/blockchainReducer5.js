const initialState = {
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: "",
  };
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CONNECTION_REQUEST_5":
        return {
          ...initialState,
          loading: true,
        };
      case "CONNECTION_SUCCESS_5":
        return {
          ...state,
          loading: false,
          account: action.payload.account,
          smartContract: action.payload.smartContract,
          web3: action.payload.web3,
          isOwnSmartContract: action.payload.isOwnSmartContract
        };
      case "CONNECTION_FAILED_5":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT_5":
        return {
          ...state,
          account: action.payload.account,
        };
      default:
        return state;
    }
  };
  
  export default blockchainReducer;
  