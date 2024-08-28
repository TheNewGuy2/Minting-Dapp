// log
import store from "../store";
import Web3EthContract from "web3-eth-contract";
import { configurations } from "../blockchain/blockchainActions5";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST_5",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS_5",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED_5",
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
      let isPaused = await SmartContractObj.methods.paused().call();
      let totalSupply = await SmartContractObj.methods.totalSupply().call();
      let isStagingUri = await SmartContractObj.methods.stagingURI().call();
      let isAuctionUri = await SmartContractObj.methods.auctionURI().call();
      let isStagingName = await SmartContractObj.methods.stagingName().call();
      let isAuctionName = await SmartContractObj.methods.auctionName().call();
      let cost = await SmartContractObj.methods.cost().call();
     
      let tokenUri = await SmartContractObj.methods.tokenURI(totalSupply - 1).call();
      const base64String = tokenUri.split(',')[1];
      const jsonString = atob(base64String);
      const data = JSON.parse(jsonString);

      isStagingName = data.name;
      isStagingUri = data.image_data;

      isAuctionName = data.name;
      isAuctionUri = data.image_data;

      let remainingTime = calculateSecondsRemaining();
      
      dispatch(
        fetchDataSuccess({
          totalSupply,
          paused: isPaused,
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

const calculateSecondsRemaining = () => {
    // Get the current time in UTC
    const now = new Date();
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;

    // Eastern Time is UTC-5 or UTC-4 depending on DST
    const easternTimeOffset = -4 * 60 * 60 * 1000; // Consider DST (UTC-4)
    const easternNow = new Date(utcNow + easternTimeOffset);

    // Calculate midnight in Eastern Time
    const midnight = new Date(easternNow);
    midnight.setHours(24, 0, 0, 0); // Midnight of the current day

    // Calculate the difference in milliseconds and convert to seconds
    const difference = midnight - easternNow;
    return Math.floor(difference / 1000);
};
