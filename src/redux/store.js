import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";

import blockchainReducer2 from "./blockchain/blockchainReducer2";
import dataReducer2 from "./data/dataReducer2";
import blockchainReducer3 from "./blockchain/blockchainReducer3";
import dataReducer3 from "./data/dataReducer3";
import blockchainReducer4 from "./blockchain/blockchainReducer4";
import dataReducer4 from "./data/dataReducer4";

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
  blockchain2: blockchainReducer2,
  data2: dataReducer2,
  blockchain3: blockchainReducer3,
  data3: dataReducer3,
  blockchain4: blockchainReducer4,
  data4: dataReducer4,
});

const middleware = [thunk];
//dev
// const composeEnhancers = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//prod
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
