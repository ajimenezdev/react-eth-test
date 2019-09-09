const baseRinkebyURL = "https://api-rinkeby.etherscan.io/api";

const baseMainURL = "https://api.etherscan.io/api";

const getBaseURL = (network: string) => {
  switch (network) {
    case "Rinkeby":
      return baseRinkebyURL;
    case "Mainnet":
      return baseMainURL;
    default:
      // throw new Error(`Unkown network: "${network}"`);
      break;
  }
};

const getAccountBalance = async (address: string, network: string) =>
  fetch(
    `${getBaseURL(network)}/?module=account&action=balance&address=${address}`
  ).then(response => response.json());

const getAccountTransactions = async (address: string, network: string) =>
  fetch(
    `${getBaseURL(network)}/?module=account&action=txlist&address=${address}`
  ).then(response => response.json());

export { getAccountBalance, getAccountTransactions };
