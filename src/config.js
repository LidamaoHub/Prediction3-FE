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
    3:{
      token: "ETH",
        chainId: "0x3",
        chainName: "Ropsten",
        token_list: {
          PTT:"0xEC7268940B48Bf4849487987B0e9C9d4c1E7Cfa3"
        },
        factory_address: "0x61233cc075b94f4808D05BFf1b3984764b2086ba",
    },
    // 4: {
    //   token: "ETH",
    //   chainId: "0x4",
    //   chainName: "Rinkeby",
    //   token_list: {
    //     LDM: "0xc606ab99967780655609115Aa9aB6A98a43bd3B9",
    //   },
    //   factory_address: "0xE37686F739Fb8CB1fFaA1CBA12E2aF4ff75BeA6a",
    // },
    137: {
      token: "Matic",
      chainId: "0x89",
      chainName: "Polygon",
      token_list: {
        LDM: "0x15e11E29AdE9909f9B24e5aE950f5c4880a5Cc4F",
        // "UDST":"0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
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
