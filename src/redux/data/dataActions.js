// src/redux/data/dataActions.js

// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

/**
 * Fetch contract-wide data AND per-account data.
 *
 * Currently:
 * - totalSupply: from smartContract.totalSupply()
 * - balance: from smartContract.balanceOf(account) if account is connected
 */
export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const state = store.getState();
      const blockchain = state.blockchain;

      const smartContract = blockchain.smartContract;
      const account = blockchain.account;

      if (!smartContract) {
        throw new Error("Smart contract not loaded in state.");
      }

      // Global data
      const totalSupply = await smartContract.methods.totalSupply().call();

      // Per-account data (holder detection)
      let balance = 0;
      if (account && account !== "") {
        try {
          balance = await smartContract.methods.balanceOf(account).call();
        } catch (e) {
          console.error("Error fetching balanceOf for account:", account, e);
          balance = 0;
        }
      }

      dispatch(
        fetchDataSuccess({
          totalSupply,
          balance,
          // cost: (you can re-enable cost later if you want)
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
