import React from "react";
import { Paper, List, ListItem } from "@material-ui/core";
import web3 from "web3";
import { getTransactionURL, getAddressURL } from "../../data/ethereumData";

import "./transactionsList.css";

interface ListProps {
  transactions: Array<any>;
  network: string;
  onAddressClick: Function;
}

const TransactionsList: React.FC<ListProps> = ({
  transactions,
  network,
  onAddressClick
}) => {
  return (
    <Paper className="body-list">
      <ul className="list">
        <li key="header" className="list-item list-header">
          <span className="list-nonce">Nonce</span>
          <span className="list-hash">T.Hash</span>
          <span className="list-from">From</span>
          <span className="list-to">To</span>
          <span className="list-value">Value</span>
        </li>
        {transactions.map(t => (
          <li key={t.hash} className="list-item">
            <span className="list-nonce">{t.nonce}</span>
            <a
              href={getTransactionURL(t.hash, network)}
              target="_blank"
              className="list-hash"
            >
              {t.hash}
            </a>
            <span className="list-from">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onAddressClick(t.from);
                }}
                target="_blank"
                className="list-hash"
              >
                {t.from}
              </a>
            </span>
            <span className="list-to">
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onAddressClick(t.to || t.contractAddress);
                }}
                target="_blank"
                className="list-hash"
              >
                {t.to || `Contract(${t.contractAddress})`}
              </a>
            </span>

            <span className="list-value">
              {web3.utils.fromWei(t.value.toString())} ETH
            </span>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default TransactionsList;
