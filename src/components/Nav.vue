<template>
  <div class="nav">
    <div class="container">
      <router-link :to="{name:'Home'}" ><div class="logo-title">History</div></router-link>
      <div class="right">
        <!-- <a-button size="large">Create Predict</a-button> -->
         <router-link :to="{name:'Bank'}" ><a-button size="large">获取测试币</a-button></router-link>
        <a-button size="large" class="connect-wallet" @click="connect_wallet" v-if="!address"
          >Connect Wallet</a-button
        >
        <div class="wallet btn" v-else>
          <div class="balance">{{balance}} MATIC</div>
          <div class="division"></div>
          <div class="address">{{ `${address.slice(0,4)}...${address.slice(address.length-4)}` }}</div>
          <avatar variant="beam" :size="25" :name="address" class="avatar" :colors="color" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config"
import Avatar from "vue2-boring-avatars";

import { ethers } from 'ethers';
export default {
  components: { Avatar },
  data() {
    return {
      address: null,
      color:["#56BC8A","#D85E40","#F2992E","#FFFFFF"],
      balance:0,
    };
  },
  async mounted(){
      let self = this
      self.connect_wallet()
  },
  methods: {
      async change_chain() {
      let self = this;
      if (self.chainId != config.chainId) {
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId:config.chainId}],
          })
          .then((res) => {
              window.location.reload();
          })
          .catch((error) => {
          });
      } 
    },
    async update_balance(){
        let self = this
        let balance = await self.web3.getBalance(self.wallet_address)
        self.balance = Number(ethers.utils.formatEther(balance)).toFixed(2)
    },
    async connect_wallet() {
      let self = this;
      let web3Provider;
      // mount 时在全局写入 web3
      if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
          // 请求用户授权
          await window.ethereum.enable();
        } catch (error) {}
      } else if (window.web3) {
        web3Provider = window.web3.currentProvider;
      }

    web3 = new ethers.providers.Web3Provider(web3Provider)
    let user =  web3.getSigner()
      self.$store.commit("setWeb3", { web3 });

      let wallet_address = await user.getAddress();
      let networkInfo = await web3.getNetwork()

      let chainId = networkInfo.chainId;
      self.chainId = chainId;
      self.$store.commit("setNetwork", { badChainId:chainId!=config.chainId })
      if (wallet_address) {
        self.$store.commit("setAddress", { address:wallet_address });
          self.address = wallet_address
          self.update_balance()

        await self.change_chain();
      }

      window.ethereum.on("chainChanged", (chainId) => {
        self.change_chain();
      });
      window.ethereum.on("accountsChanged", async (chainId) => {
        wallet_address = await user.getAddress();
         self.$store.commit("setAddress", { address:wallet_address });
      });
      
    },
  },
  computed: {
    user_address() {
      let self = this;
      if (self.wallet_address) {
        let l = self.wallet_address.length;
        return `${self.wallet_address.substring(
          0,
          5
        )}...${self.wallet_address.substring(l - 5, l)}`;
      }
    },
    ...mapState(["web3", "wallet_address"]),
  },
};
</script>
<style lang="less">
// @import '~ant-design-vue/dist/antd.less';
.nav {
  background-color: white;
  height: 80px;
  line-height: 80px;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  .container {
    display: flex;
  }
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .logo-title {
    font-weight: bold;
    font-size: 25px;
  }
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
    .connect-wallet {
      margin-left: 20px;
    }
    .wallet {
      margin-left: 20px;
      background-color: white;
      border: 1px solid #d9d9d9;
      box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
      display: flex;
      height: 40px;
      padding: 0 15px;
      font-size: 14px;
      border-radius: 4px;
      line-height: 40px;
      align-items: center;
      .division {
        width: 1px;
        height: 15px;
        background-color: rgba(0, 0, 0, 0.45);
        margin: 0px 10px;
      }
      .address {
      }
      .avatar {
        margin-left: 5px;
      }
    }
  }
}
</style>
