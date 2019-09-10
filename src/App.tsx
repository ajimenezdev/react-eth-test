import React, { useReducer, useEffect, useState } from "react";
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
import {
  reducer,
  initialState,
  dispatchFetchStarted,
  dispatchUpdateBalance,
  dispatchUpdateTransactions,
  dispatchUpdateSearch
} from "./data/ethereumReducer";

const updateBalance = async (
  address: string,
  network: string,
  dispatch: any
) => {
  const balance = await getAccountBalance(address, network);
  dispatchUpdateBalance(dispatch, balance.result);
};

const updateTransactions = async (
  address: string,
  network: string,
  dispatch: any
) => {
  const transactionsObj = await getAccountTransactions(address, network);
  const transactions = transactionsObj.result.sort((a: any, b: any) =>
    parseInt(a.nonce) < parseInt(b.nonce) ? "1" : "-1"
  );
  dispatchUpdateTransactions(dispatch, transactions);
};
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

  useEffect(() => {
    if (network && address) {
      dispatchFetchStarted(dispatch);
      updateBalance(address, network, dispatch);
      updateTransactions(address, network, dispatch);
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
            dispatchUpdateSearch(dispatch, address, network)
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
