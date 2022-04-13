const initialState = {
    loading: false,
    totalSupply: 0,
    cost: 0,
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST_4":
        return {
          ...state,
          loading: true,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_SUCCESS_4":
        return {
          ...state,
          loading: false,
          totalSupply: action.payload.totalSupply,
          stagingURI: action.payload.stagingURI,
          auctionURI: action.payload.auctionURI,
          stagingName: action.payload.stagingName,
          auctionName: action.payload.auctionName,
          paused: action.payload.paused,
          cost: action.payload.cost,
          remainingTime: (action.payload.remainingTime * 1000),
          // cost: action.payload.cost,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_FAILED_4":
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
  