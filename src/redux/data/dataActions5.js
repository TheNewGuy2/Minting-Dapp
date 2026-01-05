// src/redux/data/dataActions5.js
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

// Safe base64 decode for browsers
const decodeBase64 = (b64) => {
  try {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(b64), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (e) {
    // fallback
    try {
      return atob(b64);
    } catch (e2) {
      return "";
    }
  }
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let { abi, CONFIG } = await configurations();
      const SmartContractObj = new Web3EthContract(abi, CONFIG.CONTRACT_ADDRESS);

      const isPaused = await SmartContractObj.methods.paused().call();
      const totalSupplyRaw = await SmartContractObj.methods.totalSupply().call();

      // totalSupplyRaw is usually a string; normalize to number safely
      const totalSupply = Number(totalSupplyRaw);

      let isStagingUri = await SmartContractObj.methods.stagingURI().call();
      let isAuctionUri = await SmartContractObj.methods.auctionURI().call();
      let isStagingName = await SmartContractObj.methods.stagingName().call();
      let isAuctionName = await SmartContractObj.methods.auctionName().call();
      let cost = await SmartContractObj.methods.cost().call();

      // ✅ Only try to read tokenURI if supply > 0
      if (Number.isFinite(totalSupply) && totalSupply > 0) {
        const lastTokenId = totalSupply - 1;

        // tokenURI is base64 json: data:application/json;base64,...
        const tokenUri = await SmartContractObj.methods.tokenURI(lastTokenId).call();
        const base64String = tokenUri.split(",")[1] || "";
        const jsonString = decodeBase64(base64String);

        try {
          const parsed = JSON.parse(jsonString);
          // You were using these fields to populate both staging and auction
          isStagingName = parsed.name || isStagingName;
          isStagingUri = parsed.image_data || isStagingUri;

          isAuctionName = parsed.name || isAuctionName;
          isAuctionUri = parsed.image_data || isAuctionUri;
        } catch (e) {
          console.warn("Failed to parse tokenURI JSON:", e);
        }
      } else {
        // supply is 0, so keep the contract defaults (staging/auction values)
        // Optional: set names to something friendly if empty
        if (!isAuctionName) isAuctionName = "No mints yet";
        if (!isStagingName) isStagingName = "No mints yet";
      }

      const remainingTime = calculateSecondsRemaining();

      dispatch(
        fetchDataSuccess({
          totalSupply: totalSupplyRaw, // keep original type your UI expects
          paused: isPaused,
          stagingURI: isStagingUri,
          auctionURI: isAuctionUri,
          stagingName: isStagingName,
          auctionName: isAuctionName,
          cost: cost,
          remainingTime: remainingTime,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

const calculateSecondsRemaining = () => {
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;

  // Eastern Time is UTC-5 or UTC-4 depending on DST
  const easternTimeOffset = -4 * 60 * 60 * 1000; // Consider DST (UTC-4)
  const easternNow = new Date(utcNow + easternTimeOffset);

  const midnight = new Date(easternNow);
  midnight.setHours(24, 0, 0, 0);

  const difference = midnight - easternNow;
  return Math.floor(difference / 1000);
};

