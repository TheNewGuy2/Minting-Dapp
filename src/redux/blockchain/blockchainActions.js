// src/redux/blockchain/blockchainActions.js

import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

// Main connect() thunk for Release1
export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());

    try {
      // Load ABI + CONFIG
      const abiResponse = await fetch("/config/abi.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const abi = await abiResponse.json();

      const configResponse = await fetch("/config/config.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const CONFIG = await configResponse.json();

      console.log("[connect] Loaded CONFIG:", CONFIG);

      const { ethereum } = window;
      const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

      if (!metamaskIsInstalled) {
        console.warn("[connect] MetaMask not detected");
        dispatch(connectFailed("Install MetaMask."));
        return;
      }

      Web3EthContract.setProvider(ethereum);
      const web3 = new Web3(ethereum);

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({ method: "net_version" });

        console.log("[connect] Debug info:", {
          accounts,
          detectedNetworkId: networkId,
          expectedNetworkId: String(CONFIG.NETWORK.ID),
          networkName: CONFIG.NETWORK.NAME,
        });

        if (!accounts || accounts.length === 0) {
          console.warn("[connect] No accounts returned from MetaMask.");
          dispatch(
            connectFailed(
              "No accounts found. Check MetaMask and ensure you are connected."
            )
          );
          return;
        }

        // Check network ID vs config
        if (String(networkId) !== String(CONFIG.NETWORK.ID)) {
          const msg = `Change network to ${CONFIG.NETWORK.NAME}. (Detected chainId/net_version=${networkId})`;
          console.warn("[connect] Network mismatch:", msg);
          dispatch(connectFailed(msg));
          return;
        }

        // Network is correct; set up contract
        const SmartContractObj = new Web3EthContract(
          abi,
          CONFIG.CONTRACT_ADDRESS
        );

        let isOwnSmartContract = [];
        try {
          // This call can fail if method doesn't exist or contract is different
          isOwnSmartContract = await SmartContractObj.methods
            .walletOfOwner(accounts[0])
            .call();
          console.log(
            "[connect] walletOfOwner result for",
            accounts[0],
            ":",
            isOwnSmartContract
          );
        } catch (err) {
          console.warn(
            "[connect] walletOfOwner call failed (may be OK if method not used in UI):",
            err
          );
          isOwnSmartContract = [];
        }

        dispatch(
          connectSuccess({
            account: accounts[0],
            smartContract: SmartContractObj,
            web3: web3,
            isOwnSmartContract: isOwnSmartContract,
          })
        );

        // Listen for account & chain changes
        ethereum.on("accountsChanged", (accountsChanged) => {
          console.log("[connect] accountsChanged:", accountsChanged);
          dispatch(updateAccount(accountsChanged[0]));
        });
        ethereum.on("chainChanged", (chainId) => {
          console.log("[connect] chainChanged:", chainId);
          window.location.reload();
        });
      } catch (err) {
        console.error("[connect] Error during MetaMask request:", err);
        dispatch(
          connectFailed(
            "Something went wrong while connecting. See console for details."
          )
        );
      }
    } catch (err) {
      console.error("[connect] General error:", err);
      dispatch(
        connectFailed(
          "Something went wrong while loading ABI/CONFIG. See console for details."
        )
      );
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData());
  };
};
