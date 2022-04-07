<template>
    <div class="network-shadow" v-if="badChainId">
      <div class="body">
        <div class="title">This feature is not yet supported on this network</div>
      <div class="content">Please change to the rinkeby network</div>
       <a-button type="primary" @click='change_chain'>
      Change Network
    </a-button>
      </div>
      
    </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config"

export default {
    methods:{
         async change_chain() {
      let self = this;
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId:config.chainId}],
          })
          .then((res) => {
              window.location.reload();
          })
          .catch((error) => {
          });
    },
    },
    computed: {
    ...mapState(["web3", "wallet_address","badChainId"]),
  },
}
</script>
<style lang="less">
    .network-shadow {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    .body{
      text-align: center;
      background: white;
      padding: 20px;
      box-shadow: 0px 0px 10px 10px white;
      .title{
        font-weight: bold;
        font-size: 25px;
        margin-bottom: 20px;
      }
      .content{
        font-size: 20px;
        margin-bottom: 20px;
      }
    }
  }
</style>