<template>
  <div class="bank">
    <nav-header></nav-header>
    <div class="body">
      <div class="container">
        <div class="content">
          If you have the Family NFT ,You can claim nft holdings * 1000 tokens, that might be slow
        </div>
        <div class="user_info">
          <a-statistic
            title="Coin Balance"
            :value="balance"
            style="margin-right: 50px"
          />
            <a-spin :spinning="balance_loading">
          <a-statistic
            title="NFT Balance"
            :value="nft_balance"
            style="margin-right: 50px"
          /></a-spin>
            <a-spin :spinning="can_claim_loading">
          <a-statistic title="Can Claim" :value="can_claim" />
            </a-spin>
        </div>
        <div>
          <a-button
            type="primary"
            @click="claim()"
            block
            :loading="btn_loading"
          >
            Claim
          </a-button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import Mixin from "@/mixin/mixin.vue";

import bankAbi from "@/abi/bank_abi.json";
import nftAbi from "@/abi/nft_abi.json";
import { mapState } from "vuex";
import NavHeader from "@/components/Nav.vue";
import config from "@/config";
const token_address = config.token_address;
const nft_address = config.nft_address;
export default {
  mixins: [Mixin],
  components: {
    NavHeader,
  },
  data() {
    return {
      balance: 0,
      contract: null,
      nft_balance: 0,
      can_claim: 0,
      btn_loading: false,
      nftContract: null,
      token_list: [],
      balance_loading:true,
      can_claim_loading:true
    };
  },
  methods: {
    async get_balance() {
      let self = this;

    },
    async getNftList() {
      let self = this;
      let token_id = 63;
      token_id = parseInt(token_id);
      let token_list = [];
      
      for (let i = 1; i < token_id; i++) {
        let add = await self.nftContract.ownerOf(i);
        if (self.wallet_address == add) {
          token_list.push(i);
        }
      }
      self.token_list = token_list;
      self.nft_balance = self.token_list.length;
      self.balance_loading = false
    },
    async claim() {
      let self = this;
      self.btn_loading = true;
      let token_list = await self.token_list;
      self.contract.claim(token_list).then(
        async (tx) => {
          await tx.wait();
          await self.init();
          self.btn_loading = false;
        },
        (error) => {
          self.dealError(error);
          self.btn_loading = false;
        }
      );
    },
    async get_can_claim() {
      let self = this;
      let amount = 0;
      for (let i = 0; i < self.token_list.length; i++) {
        let address = await self.contract.userClaim(self.token_list[i]);
        if (address=="0x0000000000000000000000000000000000000000") {
          amount += 1;
        }
      }
      self.can_claim = amount * 1000;
      self.can_claim_loading = false
    },
    async init() {
      let self = this;
      let token_contract = new self.$ethers.Contract(
        token_address,
        bankAbi,
        self.web3
      );
      let signer = await self.web3.getSigner();
      token_contract = token_contract.connect(signer);
      self.contract = token_contract;
      let balance = await token_contract.balanceOf(self.wallet_address);
      balance = self.$ethers.utils.formatEther(balance);
      self.balance = balance;

      let nft_contract = new self.$ethers.Contract(
        nft_address,
        nftAbi,
        self.web3
      );
      self.nftContract = nft_contract;
      
      await self.getNftList();
      await self.get_can_claim();
    },
  },
  async mounted() {
    let self = this;
    if (self.wallet_address) {
      self.init();
    }
  },
  watch: {
    allDone() {
      let self = this;
      self.init();
    },
  },
  computed: {
    ...mapState(["web3", "wallet_address", "allDone"]),
  },
};
</script>
<style lang="less">
.bank {
  text-align: center;
  .content {
    margin-bottom: 40px;
  }
  .body {
    text-align: center;
    padding: 50px;
    font-size: 25px;
    .user_info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
  }
}
</style>
