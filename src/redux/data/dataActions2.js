// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST_2",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS_2",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED_2",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain2.smartContract.methods.totalSupply()
        .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
