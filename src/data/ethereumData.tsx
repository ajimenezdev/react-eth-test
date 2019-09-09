const baseRinkebyApiURL = "https://api-rinkeby.etherscan.io/api";
const baseMainApiURL = "https://api.etherscan.io/api";
const baseRinkebyWebURL = "https://rinkeby.etherscan.io";
const baseMainWebURL = "https://etherscan.io/";

const getBaseApiURL = (network: string) => {
  switch (network) {
    case "Rinkeby":
      return baseRinkebyApiURL;
    case "Mainnet":
      return baseMainApiURL;
    default:
      throw new Error(`Unkown network: "${network}"`);
  }
};

const getBaseWebURL = (network: string) => {
  switch (network) {
    case "Rinkeby":
      return baseRinkebyWebURL;
    case "Mainnet":
      return baseMainWebURL;
    default:
      throw new Error(`Unkown network: "${network}"`);
  }
};

const getAccountBalance = async (address: string, network: string) =>
  fetch(
    `${getBaseApiURL(
      network
    )}/?module=account&action=balance&address=${address}`
  ).then(response => response.json());

const getAccountTransactions = async (address: string, network: string) =>
  fetch(
    `${getBaseApiURL(network)}/?module=account&action=txlist&address=${address}`
  ).then(response => response.json());

const getTransactionURL = (address: string, network: string) =>
  `${getBaseWebURL(network)}/tx/${address}`;

const getAddressURL = (address: string, network: string) =>
  `${getBaseWebURL(network)}/address/${address}`;

export {
  getAccountBalance,
  getAccountTransactions,
  getTransactionURL,
  getAddressURL
};
