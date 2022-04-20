<script>
import { mapState } from "vuex";
import pred_abi from "@/abi/pred_abi.json";
import { ethers } from "ethers";
import config from "@/config";
import factory_abi from "@/abi/factory_abi.json";

export default {
  computed: {
    ...mapState([
      "web3",
      "wallet_address",
      "badChainId",
      "predContract",
      "factoryContract",
      "showVModal",
      "balance",
      "networkInfo",
    ]),
  },

  methods: {
    dealError(error) {
      let self = this;
      let m = error.error ? error.error.message : error.message;
      self.$notification.error({
        message: m,
      });
    },
    async getPredictionInfo(address) {
      let self = this;
      let signer = web3.getSigner();
  
      let contract = await new self.$ethers.Contract(
        address,
        pred_abi,
        self.web3
      );
      contract = contract.connect(signer)
      let predInfo = await contract.predictionInfo();
      let [
        publishState,
        voteState,
        sideAShares,
        sideBShares,
        CoinAddress,
        arbiter,
        sharePrice,
        fee,
        pred_intro_hash,
      ] = predInfo;
      return {
        publishState,
        voteState,
        sideAShares: parseInt(sideAShares),
        sideBShares: parseInt(sideBShares),
        CoinAddress,
        arbiter,
        sharePrice: parseInt(sharePrice),
        fee: parseInt(fee),
        pred_intro_hash,
        pred_address: address,
        contract
      };
    },
    async connect_wallet() {
      let self = this;
      let web3Provider;
      // mount 时在全局写入 web3
      console.log('connect_wallet')
      if (window.ethereum) {
        console.log('e')
        web3Provider = window.ethereum;
        try {
          // 请求用户授权
          let addr=await ethereum.request({ method: 'eth_requestAccounts' });//授权连接钱包
        console.log('user wallet address:',addr);
          // await window.ethereum.request({ method: 'eth_requestAccounts' }) 
          // await window.ethereum.eth_requestAccounts();
        } catch (error) {
          console.log('err',error)
        }
      } else if (window.web3) {
        web3Provider = window.web3.currentProvider;
      }
      web3 = new ethers.providers.Web3Provider(web3Provider);
      let user = web3.getSigner();
      self.$store.commit("setWeb3", { web3 });

      let wallet_address = await user.getAddress();

      let network = await self.initChainInfo(); //根据chainId初始化各个链上基础conf


      if (wallet_address) {
        self.$store.commit("setAddress", { address: wallet_address });
        self.update_balance();
      }
      //init factory
      let factoryContract = await new self.$ethers.Contract(
        network.factory_address,
        factory_abi,
        self.web3
      );
      factoryContract = factoryContract.connect(user);
      self.$store.commit("setFactory", { contract: factoryContract });

      self.$store.commit("setAllDone", { type: true });
      console.log("alldone")
    },
    async update_balance() {
      let self = this;
      let balance = await self.web3.getBalance(self.wallet_address);
      balance = Number(ethers.utils.formatEther(balance)).toFixed(2);
      self.$store.commit("updateBalance", { balance });
    },
    async initChainInfo() {
      let self = this;
      let networkInfo = await self.web3.getNetwork();
      let chainId = networkInfo.chainId;
      let network = config.networks[chainId];
      if (network) {
        self.$store.commit("setNetworkInfo", { network });
      } else {
        self.$store.commit("setNetwork", {
          badChainId: true,
        });
      }
      return network
    },
  },
};
</script>
