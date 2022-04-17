<template>
  <div class="nav">
    <div class="container">
      <router-link :to="{ name: 'Home' }"
        ><div class="logo-title">History</div></router-link
      >
      <div class="right">
        <!-- <router-link :to="{ name: 'Bank' }">
          <a-button size="small">Get Test Coin</a-button>
        </router-link> -->
        <router-link :to="{ name: 'New' }"> Create Prediction </router-link>
        <a-button class="connect-wallet" @click="connect_wallet" v-if="!wallet_address"
          >Connect Wallet</a-button
        >
        <div class="wallet btn" v-else>
          <div class="balance">{{ balance }} {{networkInfo.token}}</div>
          <div class="division"></div>
          <div class="address">
            {{
              `${wallet_address.slice(0, 4)}...${wallet_address.slice(wallet_address.length - 4)}`
            }}
          </div>
          <avatar
            variant="beam"
            :size="25"
            :name="wallet_address"
            class="avatar"
            :colors="color"
          />
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
  methods: {
    
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
      border: 1px solid #d9d9d9;
      display: flex;
      box-sizing: border-box;
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
