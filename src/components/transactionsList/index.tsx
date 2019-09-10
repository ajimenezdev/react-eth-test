import React, { useState } from "react";
import { Paper, TextField, MenuItem } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import web3 from "web3";
import { getTransactionURL, getAddressURL } from "../../data/ethereumData";

import "./transactionsList.css";

interface ListProps {
  transactions: Array<any>;
  address: string;
  network: string;
  onAddressClick: Function;
}

const TransactionsList: React.FC<ListProps> = ({
  transactions,
  address,
  network,
  onAddressClick
}) => {
  const [filterFromTo, setFilterFromTo] = useState("from");
  const [displayCount, setDisplayCount] = useState(10);
  const getTransactions = () => {
    let filteredTx;
    switch (filterFromTo) {
      case "from":
        filteredTx = transactions.filter(
          (t: any) => t.from.toUpperCase() === address.toUpperCase()
        );
        break;
      case "to":
        filteredTx = transactions.filter(
          (t: any) => t.to.toUpperCase() === address.toUpperCase()
        );
        break;
      default:
        filteredTx = transactions;
    }
    return filteredTx.slice(0, displayCount);
  };
  return (
    <Paper className="body-list">
      <div className="list-filters">
        <div className="list-filterItem">
          <span>Select Transaction Source:</span>
          <ToggleButtonGroup
            exclusive
            value={filterFromTo}
            onChange={(event, newFilter) => setFilterFromTo(newFilter)}
          >
            <ToggleButton value="both">Both</ToggleButton>
            <ToggleButton value="from">From</ToggleButton>
            <ToggleButton value="to">To</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="list-filterItem">
          <span>Show last:</span>
          <TextField
            select
            className="list-countFilter"
            value={displayCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayCount(parseInt(event.target.value))
            }
            margin="normal"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </TextField>
        </div>
      </div>
      <ul className="list">
        <li key="header" className="list-item list-header">
          <span className="list-nonce">Nonce</span>
          <span className="list-hash">T.Hash</span>
          <span className="list-from">From</span>
          <span className="list-to">To</span>
          <span className="list-value">Value</span>
        </li>
        {getTransactions().map(t => (
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
