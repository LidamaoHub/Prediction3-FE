const conf = {
  networks: {
    31337: {
      token: "ETH",
      chainId: "0x7a69",
      chainName: "Hardhat",
      token_list: {
        LDM: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
      },
      factory_address: "0xC9a43158891282A2B1475592D5719c001986Aaec",
    },
    11155111: {
      token: "ETH",
      chainId: "0xaa36a7",
      chainName: "Sepolia",
      token_list: {
        PTT: "0x7B07C3a14193c9bB99598627E881F24adf8186eF"
      },
      factory_address: "0x68335032d9Bd27b43fD05D21275345235A1096dD",
    },
    137: {
      token: "Matic",
      chainId: "0x89",
      chainName: "Polygon",
      token_list: {
        LDM: "0x15e11E29AdE9909f9B24e5aE950f5c4880a5Cc4F",
      },
      factory_address: "0xddC192921Affaf7d552b75Fd5D8f2E5a1b015eAD",
    },
    70: {
      token: "ETH",
      chainId: "0x46",
      chainName: "HOO SMART CHAIN",
      token_list: {
        WETH: "0xA1588dC914e236bB5AE4208Ce3081246f7A00193",
        WBNB: "0xa787254704339474A827bd1ee4772c455e3aE7F2",
      },
      factory_address: "0x7edEcbd201c8AE2440D280f68E306c985b58FEDB",
    },

  },
};

export default conf;
