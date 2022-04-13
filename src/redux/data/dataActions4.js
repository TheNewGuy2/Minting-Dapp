// log
import store from "../store";
import Web3EthContract from "web3-eth-contract";
import { configurations } from "../blockchain/blockchainActions4";

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
      let { abi, CONFIG } = await configurations();
      const SmartContractObj = new Web3EthContract(
        abi,
        CONFIG.CONTRACT_ADDRESS
      );
      let totalSupply = await SmartContractObj.methods.totalSupply().call();
      let isStagingUri = await SmartContractObj.methods.stagingURI().call();
      let isAuctionUri = await SmartContractObj.methods.auctionURI().call();
      let isStagingName = await SmartContractObj.methods.stagingName().call();
      let isAuctionName = await SmartContractObj.methods.auctionName().call();
      let cost = await SmartContractObj.methods.cost().call();
      let remainingTime = await SmartContractObj.methods.remainingTime(1).call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          stagingURI: isStagingUri,
          auctionURI: isAuctionUri,
          stagingName: isStagingName,
          auctionName: isAuctionName,
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
