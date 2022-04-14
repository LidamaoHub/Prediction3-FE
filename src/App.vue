<template>
  <div id="app">
    <nav-header></nav-header>
    <div class="all" :class="{ withShadow: badChainId }">
      <div class="container">
        <router-view />
      </div>
    </div>
    <network-shadow />
  </div>
</template>
<script>
import NavHeader from "@/components/Nav.vue";
import NetworkShadow from "@/components/Shadow";
import { mapState } from "vuex";
import factory_abi from "@/abi/factory_abi.json";
import config from "@/config";
let factory_address = config.chef_address;

export default {
  components: {
    NavHeader,
    NetworkShadow,
  },
  computed: {
    ...mapState(["badChainId",'web3']),
  },
  watch:{
    async web3(){
      let self = this
      let signer = self.web3.getSigner();

      let factoryContract = await new self.$ethers.Contract(
        factory_address,
        factory_abi,
        self.web3
      );
      factoryContract = factoryContract.connect(signer)
      self.$store.commit("setFactory",{contract:factoryContract})
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
