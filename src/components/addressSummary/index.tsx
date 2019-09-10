import React from "react";
import { Paper, Badge, Icon, IconButton } from "@material-ui/core";
import web3 from "web3";
import { getAddressURL } from "../../data/ethereumData";
import "./addressSummary.css";

interface SummaryProps {
  address: string;
  network: string;
  balance: number;
  onAddressClick: Function;
}

const AddressSummary: React.FC<SummaryProps> = ({
  address,
  network,
  balance,
  onAddressClick
}) => {
  const badgeText = network === "Mainnet" ? "Main" : "Test";

  return (
    <Paper className="body-summary">
      {/* Do not display badge if no network selected */}
      {network && (
        <Badge
          badgeContent={badgeText}
          color="primary"
          className="summary-badge"
        >
          <div></div>
        </Badge>
      )}
      <div className="summary-addressContainer">
        <p>Address:</p>
        {address && (
          <React.Fragment>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onAddressClick();
              }}
            >
              {address}
            </a>
            <IconButton
              aria-label="open"
              onClick={() =>
                window.open(getAddressURL(address, network), "_blank")
              }
            >
              <Icon>open_in_new</Icon>
            </IconButton>
          </React.Fragment>
        )}
      </div>
      <div className="summary-balanceContainer">
        <p>Balance:</p>
        <p>{web3.utils.fromWei(balance.toString())} ETH</p>
      </div>
    </Paper>
  );
};

export default AddressSummary;