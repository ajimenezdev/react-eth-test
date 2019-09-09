import React from "react";
import { Paper, Badge } from "@material-ui/core";
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
        <p onClick={() => onAddressClick()}>{address}</p>
      </div>
      <div className="summary-balanceContainer">
        <p>Balance:</p>
        <p>{balance}</p>
      </div>
    </Paper>
  );
};

export default AddressSummary;
