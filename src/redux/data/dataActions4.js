// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST_4",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS_4",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED_4",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store.getState().blockchain4.smartContract.methods.totalSupply().call();
      let isStagingUri = await store.getState().blockchain4.smartContract.methods.stagingURI().call();
      let isAuctionUri = await store.getState().blockchain4.smartContract.methods.auctionURI().call();
      let cost = await store.getState().blockchain4.smartContract.methods.cost().call();
      let remainingTime = await store.getState().blockchain4.smartContract.methods.remainingTime(1).call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          stagingURI: isStagingUri,
          auctionURI: isAuctionUri,
          cost: cost,
          remainingTime: remainingTime
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
