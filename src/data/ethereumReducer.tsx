const initialState = {
  network: "",
  address: "",
  balance: 0,
  fetchingBalance: false,
  transactions: [],
  fetchingTx: false
};

type ActionType = {
  type:
    | "fetchStarted"
    | "updateSearch"
    | "updateBalance"
    | "updateTransactions";
  data: any;
};

type State = {
  address: string;
  network: string;
  balance: number;
  fetchingBalance: boolean;
  transactions: Array<any>;
  fetchingTx: boolean;
};

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case "fetchStarted":
      return {
        ...state,
        fetchingBalance: true,
        fetchingTx: true
      };

    case "updateSearch":
      return {
        ...state,
        network: action.data.network,
        address: action.data.address
      };
    case "updateBalance":
      return {
        ...state,
        balance: action.data.balance,
        fetchingBalance: false
      };
    case "updateTransactions":
      return {
        ...state,
        transactions: action.data.transactions,
        fetchingTx: false
      };

    default:
      throw new Error();
  }
}

const dispatchUpdateBalance = (dispatch: any, balance: number) => {
  dispatch({
    type: "updateBalance",
    data: { balance: balance }
  });
};

const dispatchUpdateTransactions = (
  dispatch: any,
  transactions: Array<any>
) => {
  dispatch({ type: "updateTransactions", data: { transactions } });
};

const dispatchFetchStarted = (dispatch: any) => {
  dispatch({ type: "fetchStarted", data: {} });
};

const dispatchUpdateSearch = (
  dispatch: any,
  address: string,
  network: string
) => {
  dispatch({ type: "updateSearch", data: { address, network } });
};

export {
  reducer,
  initialState,
  dispatchUpdateBalance,
  dispatchUpdateTransactions,
  dispatchFetchStarted,
  dispatchUpdateSearch
};
