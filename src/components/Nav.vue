<template>
  <div class="nav">
    <div class="container">
      <router-link :to="{ name: 'Home' }"
        ><div class="logo-title">Prediction³</div></router-link
      >
      <div class="right">
        <router-link :to="{ name: 'New' }"> Create Prediction </router-link>
        <a-button
          class="connect-wallet"
          @click="connect_wallet"
          v-if="!wallet_address"
          >Connect Wallet</a-button
        >
        <div class="wallet btn" v-else>
          <div class="wallet-line">
            <div class="balance">{{ balance }} {{ networkInfo.token }}</div>
            <div class="division"></div>
            <div class="address">
              {{
                `${wallet_address.slice(0, 4)}...${wallet_address.slice(
                  wallet_address.length - 4
                )}`
              }}
            </div>
            <avatar
              variant="beam"
              :size="20"
              :name="wallet_address"
              class="avatar"
              :colors="color"
            />
          </div>
          <div class="chain-line">
            <div class="line">{{ networkInfo.chainName }} <div class="dot"></div></div>
            <div class="line" v-for="(net, key) in chain_list" :key="key">
              {{ net.chainName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "@/config";
import Avatar from "vue2-boring-avatars";
import mixin from "../mixin/mixin.vue";
import { ethers } from "ethers";
export default {
  mixins: [mixin],
  components: { Avatar },
  data() {
    return {
      address: null,
      color: ["#56BC8A", "#D85E40", "#F2992E", "#FFFFFF"],
    };
  },
  async mounted() {
    let self = this;
  },
  methods: {},
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
    chain_list() {
      let networks = Object.values(config.networks);
      if (!this.networkInfo) {
        return [];
      } else {
        let name = this.networkInfo.chainName;
        return networks.filter((e) => e.chainName != name);
      }
    },
  },
};
</script>
<style lang="less">
// @import '~ant-design-vue/dist/antd.less';
.nav {
  background-color: white;
  color: black;
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
      box-sizing: border-box;
      border-radius: 4px;
      position: relative;
      width:203px;
      &:hover .wallet-line {
        border-bottom-color: transparent;
        border-bottom-right-radius: unset;
        border-bottom-left-radius: unset;
      }
      &:hover .chain-line {
        transform: scaleY(1);
        transform-origin: top;
        height:auto;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        border-top-right-radius: unset;
        border-top-left-radius: unset;
        border-top: unset;
      }
      .wallet-line {
        height: 30px;
        font-size: 12px;

        border: 1px solid #d9d9d9;
        padding: 0 15px;
        line-height: 30px;
        border-radius: 4px;

        display: flex;
        align-items: center;

        .division {
          width: 1px;
          height: 15px;
          background-color: rgba(0, 0, 0, 0.45);
          margin: 0px 10px;
        }

        .avatar {
          margin-left: 5px;
        }
      }
      .chain-line {
      width:203px;

        position: absolute;
        box-sizing: border-box;
        background-color: white;
        z-index: 1000;
        
        transform: scaleY(0);
        transition: transform .2s ease-out;
        height:0px;
        overflow: hidden;
        .line {
          width:100%;
          line-height: 30px;
          padding: 0px 15px;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          .dot{
            height:8px;
            width:8px;
            border-radius: 50%;
            background-color: #04C086;
            margin-left: auto;
            margin-right: 6px;
          }
          &:hover{
            background-color: black;
            color: white;
          }
        }
      }
    }
  }
}
</style>
