<template>
  <div class="nav">
    <div class="container main-content">
      <router-link :to="{ name: 'Home' }"
        ><div class="logo-title">Prediction<span>³</span></div></router-link
      >
      <div class="right">
        <router-link :to="{ name: 'New' }" class="menu-item">
          <img src="@/assets/images/add.png" alt="">
          Create Prediction
        </router-link>
        <router-link :to="{ name: 'New' }" class="menu-item">
          <img src="@/assets/images/favorites.png" alt="">
          My Favorites
        </router-link>
        <div
          class="connect-wallet"
          @click="connect_wallet"
          v-if="!(networkInfo && wallet_address)"
        >
          Connect Wallet
        </div>
        <div class="wallet btn" v-else>
          <div class="wallet-line">
            <div class="balance">{{ balance }} {{ networkInfo.token }}</div>
            <div class="address">
              {{
                `${wallet_address.slice(0, 4)}...${wallet_address.slice(
                  wallet_address.length - 4
                )}`
              }}
            </div>
            <avatar
              variant="beam"
              :size="28"
              :name="wallet_address"
              class="avatar"
              :colors="color"
            />
          </div>
          <div class="chain-line">
            <div class="line line-selected">
              <div class="line-hd">
                {{ networkInfo.chainName }} <div class="dot"></div>
              </div>
              <div class="line-bd">
                {{ balance }} {{ networkInfo.token }} | {{
                `${wallet_address.slice(0, 12)}...${wallet_address.slice(
                  wallet_address.length - 4
                )}`
              }}
              </div>
            </div>
            <div class="line line-flex" v-for="(net, key) in chain_list" :key="key" @click="change_chain(net)">
              {{ net.chainName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/config";
import Avatar from "vue2-boring-avatars";
import mixin from "../mixin/mixin.vue";
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
    async connect(){
      let self = this
      await window.ethereum.request({ method: 'eth_requestAccounts' }) 
    },
    async change_chain(network) {
      let self = this
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: network.chainId }],
        })
        .then((res) => {
          self.$router.push({name:"Home"})

        })
        .catch((error) => {
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
<style lang="less" scoped>
.nav {
  background-color: white;
  color: black;
  height: 80px;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  padding: 0 130px;
  box-sizing: border-box;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logo-title {
      font-weight: 800;
      font-size: 24px;
      line-height: 29px;
      color: #1E2022;
      span {
        color: rgba(69, 126, 247, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .menu-item {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #1E2022;
        margin-right: 32px;
        height: 44px;
        padding: 0 16px;
        box-sizing: border-box;
        border-radius: 2px;
        transition: all .3s;
        &:hover {
          background: #F3F4F9;
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
      .connect-wallet {
        height: 44px;
        width: 133px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #E8EAEF;
        border-radius: 4px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #1E2022;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          border: 1px solid #8796A3;
          box-shadow: 0px 4px 9px rgba(210, 212, 222, 0.2);
        }
      }
      .wallet {
        position: relative;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #1E2022;
        &:hover .wallet-line {
          border-bottom-color: transparent;
          border-bottom-right-radius: unset;
          border-bottom-left-radius: unset;
        }
        &:hover .chain-line {
          transform: scaleY(1);
          transform-origin: top;
          height: auto;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          border-top-right-radius: unset;
          border-top-left-radius: unset;
          border-top: unset;
        }
        .wallet-line {
          height: 44px;
          padding: 0 16px;
          box-sizing: border-box;
          border-radius: 4px;
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #E8EAEF;
          &:hover {
            border: 1px solid #8796A3;
            box-shadow: 0px 4px 9px rgba(210, 212, 222, 0.2);
          }
          .balance {
            position: relative;
            margin-right: 28px;
            &::after {
              content: '';
              height: 15px;
              width: 1.5px;
              position: absolute;
              right: -15px;
              top: 0;
              bottom: 0;
              margin: auto;
              background: #000;
            }
          }
          .avatar {
            margin-left: 12px;
          }
        }
        .chain-line {
          width: 100%;
          position: absolute;
          box-sizing: border-box;
          background-color: white;
          padding: 8px;
          box-sizing: border-box;
          z-index: 1000;
          transform: scaleY(0);
          transition: transform .2s ease-out;
          height: 0px;
          overflow: hidden;
          .line {
            width: 100%;
            min-height: 40px;
            padding: 0 8px;
            box-sizing: border-box;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            color: #1E2022;
            &.line-selected {
              padding-top: 8px;
              padding-bottom: 12px;
              background: rgba(87, 198, 168, 0.08);;
            }
            &.line-flex {
              display: flex;
              align-items: center;
            }
            .line-hd {
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: space-between;
              .dot {
                height:8px;
                width:8px;
                border-radius: 50%;
                background: #57C6A8;
              }
            }
            .line-bd {
              display: flex;
              align-items: center;
              margin-top: 6px;
              font-weight: 400;
              font-size: 12px;
              line-height: 15px;
              color: #8796A3;
            }
            &:hover {
              background: #F3F5F7;
            }
          }
        }
      }
    }
  }
}
</style>
