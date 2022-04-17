<template>
    <div class="network-shadow" v-if="badChainId">
      <div class="body">
        <div class="title">This feature is not yet supported on this network</div>
      <div class="content">Please select the following networks</div>
       <a-button type="primary" @click='change_chain(net)' v-for="(net,key) in network_list" :key="key" block style="margin-bottom:20px">
      {{net.chainName}} Network
    </a-button>
      </div>
      
    </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config"
export default {
  data(){
    return {
    }
  },
  async mounted(){
let self = this
  },
    methods:{
         async change_chain(network) {
      let self = this;
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId:network.chainId}],
          })
          .then((res) => {
              window.location.reload();
          })
          .catch((error) => {
          });
    },
    },
    watch:{
      networkInfo(){
      }
    },
    computed: {
     network_list(){
       return Object.values(config.networks)
     },
    ...mapState(["web3", "wallet_address","badChainId","networkInfo"]),
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