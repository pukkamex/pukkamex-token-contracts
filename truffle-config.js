const HDWalletProvider = require("truffle-hdwallet-provider");

const fs = require("fs");

const mnemonic = fs
  .readFileSync(".secret")
  .toString()
  .trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*" // Any network (default: none)
    },

    testnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://testnet-rpc.gochain.io"),
      network_id: "*", // Match any network id
      gas: 2e7,
      gasPrice: 4e9
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://rpc.gochain.io"),
      network_id: "*", // Match any network id
      gas: 2e7,
      gasPrice: 4e9
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.2", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
};
