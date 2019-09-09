import React, { useState } from "react";
import { Paper, TextField, MenuItem, Button } from "@material-ui/core";
import web3 from "web3";
import "./form.css";

interface FormProps {
  onUpdateSearch: Function;
}

const Form: React.FC<FormProps> = ({ onUpdateSearch }) => {
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [network, setNetwork] = useState("");
  const [networkError, setNetworkError] = useState("");

  const search = () => {
    let error = false;
    // check address field
    if (!address) {
      setAddressError("This field is mandatory");
      error = true;
    } else if (!web3.utils.isAddress(address)) {
      error = true;
      setAddressError("Incorrect ETH address format");
    } else {
      setAddressError("");
    }

    // check network field
    if (!network) {
      error = true;
      setNetworkError("This field is mandatory");
    } else {
      setNetworkError("");
    }

    // return if any error
    if (error) return;

    // Update search if all ok
    onUpdateSearch(address, network);
  };

  return (
    <Paper className="body-form">
      <form className="form">
        <TextField
          label="Address"
          // className={classes.textField}
          value={address}
          error={!!addressError}
          helperText={addressError}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(event.target.value)
          }
          margin="normal"
        />
        <TextField
          select
          label="Select Network"
          // className={classes.textField}
          value={network}
          error={!!networkError}
          helperText={networkError}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNetwork(event.target.value)
          }
          margin="normal"
        >
          <MenuItem value="Rinkeby">Rinkeby</MenuItem>
          <MenuItem value="Mainnet">Mainnet</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={search}>
          Search
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
