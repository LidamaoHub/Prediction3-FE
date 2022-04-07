<template>
  <div class="bank">
    <nav-header></nav-header>
    <div class="body">
      <div>
        当前balance{{ balance }}
        <button @click="get_balance()">获取余额</button>
      </div>
      <br />
      <div><button @click="claim()">抢劫银行</button></div>
    </div>
  </div>
</template>
<script>
import bankAbi from "@/abi/bank_abi.json";
import { mapState } from "vuex";
import NavHeader from "@/components/Nav.vue";

export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      balance: null,
      contract: null,
      contract_address: "0x788C4103b063d330D4Bde56b52C54E0e58dc6c86",
    };
  },
  methods: {
    async get_balance() {
      let self = this;
      console.log(self.wallet_address);
      let balance = await self.contract.balanceOf(self.wallet_address);
      balance = self.$ethers.utils.formatEther(balance);
      self.balance = balance;
      console.log(balance);
    },
    async claim() {
      let self = this;
      console.log(self.web3);
      await self.contract.claim();
      self.get_balance();
    },
  },
  async mounted() {
    let self = this;
  },
  watch: {
    web3() {
      let self = this;
      console.log("ready");
      let contract = new self.$ethers.Contract(
        self.contract_address,
        bankAbi,
        self.web3
      );

      let signer = self.web3.getSigner();
      contract = contract.connect(signer);
      self.contract = contract;

      console.log(self.contract);
    },
  },
  computed: {
    ...mapState(["web3", "wallet_address"]),
  },
};
</script>
<style lang="less">
.bank {
  .body {
    text-align: center;
    padding: 50px;
    font-size: 25px;
  }
}
</style>
