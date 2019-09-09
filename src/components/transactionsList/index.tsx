import React from "react";
import Paper from "@material-ui/core/Paper";

interface ListProps {
  transactions: Array<any>;
}

const TransactionsList: React.FC<ListProps> = ({ transactions }) => {
  return (
    <Paper className="body-list">
      <p>Transactions List</p>
      <ul>
        {transactions.map(t => (
          <li key={t.hash}>
            {t.nonce} - {t.hash} - {t.from} => {t.to} ({t.value})
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default TransactionsList;
