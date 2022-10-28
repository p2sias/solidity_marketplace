const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config()



module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },

    mumbai: {
      provider: () => new HDWalletProvider(process.env.PASS_PHRASE, `https://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`),
      network_id: 80001, // Match any network id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
