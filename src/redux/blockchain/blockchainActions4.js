// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions4";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST_4",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS_4",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED_4",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT_4",
    payload: payload,
  };
};

export const configurations = async () => {
  const abiResponse = await fetch("/config/abi4.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const abi = await abiResponse.json();
  const configResponse = await fetch("/config/config4.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const CONFIG = await configResponse.json();
  return {
    abi,
    CONFIG
  }
} 

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    // const abiResponse = await fetch("/config/abi4.json", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });
    // const abi = await abiResponse.json();
    // const configResponse = await fetch("/config/config4.json", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // });
    // const CONFIG = await configResponse.json();
    let { abi, CONFIG } = await configurations();
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );
          const isOwnSmartContract = await SmartContractObj.methods.walletOfOwner(accounts[0]).call();
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
              isOwnSmartContract: isOwnSmartContract
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
