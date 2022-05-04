const conf = {
  networks:{
    "31337" : {
      token:"ETH",
      chainId: "0x7a69",
      chainName:"Hardhat",
      token_list: {
        "LDM":"0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
      },
      factory_address:"0xC9a43158891282A2B1475592D5719c001986Aaec",
    },
    "4":{
      token:"ETH",
      chainId: "0x4",
      chainName:"Rinkeby",
      token_list: {
        "LDM":"0xc606ab99967780655609115Aa9aB6A98a43bd3B9"
      },
      factory_address:"0xE37686F739Fb8CB1fFaA1CBA12E2aF4ff75BeA6a",
    },
    "137":{
      token:"Matic",
      chainId: "0x89",
      chainName:"Polygon",
      token_list:{
        "LDM":"0x15e11E29AdE9909f9B24e5aE950f5c4880a5Cc4F"
      },
      factory_address:"0xddC192921Affaf7d552b75Fd5D8f2E5a1b015eAD",
    },
    // "70" : {
    //   token:"ETH",
    //   chainId: "0x46",
    //   chainName:"HOO SMART CHAIN",
    //   token_address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
    //   factory_address:"0x04C89607413713Ec9775E14b954286519d836FEf",
    // },
  },

}

export default conf;
