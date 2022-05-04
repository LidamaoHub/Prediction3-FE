<template>
  <div id="app">
    <nav-header></nav-header>
    <div class="all" :class="{ withShadow: badChainId }">
      <div class="container" >
        <router-view />
      </div>
    </div>
    <page-footer></page-footer>
    <network-shadow />
  </div>
</template>
<script>
import NavHeader from "@/components/Nav.vue";
import NetworkShadow from "@/components/Shadow";
import PageFooter from "@/components/Footer";
import { mapState } from "vuex";
import mixin from "@/mixin/mixin"
export default {
  mixins:[mixin],
  components: {
    NavHeader,
    NetworkShadow,
    PageFooter
  },
  async created(){
    let self = this
    await self.connect_wallet();
  },
  computed: {
    ...mapState(["badChainId",'web3']),
  },
  watch:{
    async web3(){
      let self = this
      let signer = self.web3.getSigner();

      
    }
  },
  async mounted(){
    let self = this
    if(window.ethereum){
       window.ethereum.on("chainChanged", (chainId) => {
         console.log("changeNetwork,chainId:",chainId)
         self.connect_wallet()
      });
      window.ethereum.on("accountsChanged", async (chainId) => {
        let user = web3.getSigner();
        let wallet_address = await user.getAddress();
        console.log("changeWallet:",wallet_address)
        self.$store.commit("setAddress", { address: wallet_address });
        self.update_balance()
      });
    }
  },
  methods:{
    async initFactory(){
      let self = this 

    }
  }
};
</script>
<style lang="less">
#app {
  .all {
    margin-top: 20px;

    &.withShadow {
      filter: blur(7px);
    }
   
  }
}

.container {
  width: 565px;
  margin: 0px auto;
  position: relative;
}

a {
  color: unset;
  &:hover,
  &:link,
  &:hover,
  &:active,
  &:visited {
    color: unset !important;
    text-decoration: none;
  }
}
</style>
