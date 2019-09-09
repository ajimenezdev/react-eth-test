import React from "react";
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

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Form />
        <AddressSummary />
        <TransactionsList />
        <AddressModal visible={false} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
