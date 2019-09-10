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
  transactions: []
};

type ActionType = {
  type: "updateSearch" | "updateBalance" | "updateTransactions";
  data: any;
};

type State = {
  address: string;
  network: string;
  balance: number;
  transactions: Array<any>;
};

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case "updateSearch":
      return {
        ...state,
        network: action.data.network,
        address: action.data.address
      };
    case "updateBalance":
      return {
        ...state,
        balance: action.data.balance
      };
    case "updateTransactions":
      return {
        ...state,
        transactions: action.data.transactions
      };

    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [addressModal, setAddressModal] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { network, address, balance, transactions } = state;

  const updateBalance = async () => {
    const balance = await getAccountBalance(address, network);
    dispatch({
      type: "updateBalance",
      data: { balance: balance.result }
    });
  };

  const updateTransactions = async () => {
    const transactionsObj = await getAccountTransactions(address, network);
    const transactions = transactionsObj.result
      .filter((t: any) => t.from.toUpperCase() === address.toUpperCase())
      .sort((a: any, b: any) => (a.nonce < b.nonce ? "1" : "-1"))
      .slice(0, 10);
    dispatch({ type: "updateTransactions", data: { transactions } });
  };

  useEffect(() => {
    if (network && address) {
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
        />
        <TransactionsList
          transactions={transactions}
          network={network}
          onAddressClick={(address: string) => handleShowModal(address)}
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
