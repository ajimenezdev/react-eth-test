import React, { useReducer, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Header,
  Footer,
  Form,
  AddressSummary,
  TransactionsList,
  AddressModal
} from "./components";
import { getAccountBalance, getAccountTransactions } from "./data/ethereumData";

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

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [addressModal, setAddressModal] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    network,
    address,
    balance,
    transactions,
    fetchingBalance,
    fetchingTx
  } = state;

  const updateBalance = async () => {
    const balance = await getAccountBalance(address, network);
    dispatch({
      type: "updateBalance",
      data: { balance: balance.result }
    });
  };

  const updateTransactions = async () => {
    const transactionsObj = await getAccountTransactions(address, network);
    const transactions = transactionsObj.result.sort((a: any, b: any) =>
      parseInt(a.nonce) < parseInt(b.nonce) ? "1" : "-1"
    );
    dispatch({ type: "updateTransactions", data: { transactions } });
  };

  useEffect(() => {
    if (network && address) {
      dispatch({ type: "fetchStarted", data: {} });
      updateBalance();
      updateTransactions();
    }
  }, [network, address]);

  const handleShowModal = (address: string) => {
    setAddressModal(address);
    setShowModal(true);
  };

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Form
          onUpdateSearch={(address: string, network: string) =>
            dispatch({ type: "updateSearch", data: { address, network } })
          }
        />
        <AddressSummary
          address={address}
          network={network}
          balance={balance}
          onAddressClick={() => handleShowModal(address)}
          updating={fetchingBalance}
        />
        <TransactionsList
          transactions={transactions}
          address={address}
          network={network}
          onAddressClick={(address: string) => handleShowModal(address)}
          updating={fetchingTx}
        />
        <AddressModal
          visible={showModal}
          address={addressModal}
          network={network}
          handleClose={() => setShowModal(false)}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
