const conf = {
  networks:{
    "31337" : {
      token:"ETH",
      chainId: "0x7a69",
      chainName:"Hardhat",
      token_address: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
      factory_address:"0x04C89607413713Ec9775E14b954286519d836FEf",
    },
    "4":{
      token:"ETH",
      chainId: "0x4",
      chainName:"Rinkeby",
      token_address: "0x788C4103b063d330D4Bde56b52C54E0e58dc6c86",
    },
    "137":{
      token:"Matic",
      chainId: "0x89",
      chainName:"Matic",
      token_address: "0x788C4103b063d330D4Bde56b52C54E0e58dc6c86",
      factory_address:"0x711499654d424E1443A08BFCd8777fA349FF6932",
    }

  },

}

export default conf;
