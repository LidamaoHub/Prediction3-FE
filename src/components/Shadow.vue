<template>
  <div class="network-shadow" v-if="badChainId" @touchmove.prevent @mousewheel.prevent>
    <div class="body">
      <img src="@/assets/images/img_network.svg" alt="" class="network-img">
      <div class="title">This feature is not yet supported on this network</div>
      <div class="content">Please select the following networks</div>
      <div class="network-list">
        <div class="network-item" 
          @click="change_chain(net)"
          v-for="(net, key) in network_list"
          :key="key"
        >
          {{ net.chainName }} Network
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config";
export default {
  data() {
    return {};
  },
  async mounted() {
  },
  methods: {
    async change_chain(network) {
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.chainId }],
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => {});
    },
  },
  watch: {
    networkInfo() {},
  },
  computed: {
    network_list() {
      return Object.values(config.networks);
    },
    ...mapState(["web3", "wallet_address", "badChainId", "networkInfo"]),
  },
};
</script>
<style lang="less" scoped>
.network-shadow {
  position: fixed;
  top: 80px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 10;
  .body {
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(22px);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .network-img {
      width: 80px;
      height: auto;
    }
    .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #1E2022;
      margin-top: 32px;
    }
    .content {
      margin-top: 15px;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #8796A3;
    }
    .network-list {
      margin-top: 32px;
      .network-item {
        width: 560px;
        height: 44px;
        background: #1E2022;
        border-radius: 2px;
        margin-bottom: 24px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>
