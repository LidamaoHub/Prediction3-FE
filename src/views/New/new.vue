<template>
  <div class="new-prediction">
    <div
      class="form-box"
      :class="{
        edit_desc: step == 1,
        edit_contract: step == 2,
        loading_cover: loading.basic_loading,
      }"
      v-if="step == 1"
    >
      <div class="title">Describe Your Prediction</div>
      <div class="input-block">
        <div class="input-title">Title</div>
        <input type="text" v-model="basic_info.title" />
      </div>
      <div class="input-block">
        <div class="input-title">Description</div>
        <textarea
          name=""
          id=""
          rows="2"
          placeholder="Additional For Your Prediction"
          v-model="basic_info.description"
        ></textarea>
      </div>
      <div class="input-block">
        <div class="input-title">What does side A support</div>
        <input
          type="text"
          placeholder="e.g. This is going to happen"
          v-model="basic_info.options[0]"
        />
      </div>
      <div class="input-block" style="margin-bottom: 20px">
        <div class="input-title">What does side B support</div>
        <input
          type="text"
          placeholder="e.g. This will not happen"
          v-model="basic_info.options[1]"
        />
      </div>
      <div class="submit-btn">
        <button class="btn" @click="uploadJson">Submit to IPFS</button>
      </div>
    </div>

    <div
      class="form-box"
      v-if="step == 2"
      :class="{ loading_cover: loading.contract_loading }"
    >
      <div class="title">Full Fill Your Prediction</div>
      <div class="input-block">
        <div class="input-title">How many tokens per share</div>
        <input
          type="number"
          placeholder="e.g. 1"
          v-model="contract_info.share_price"
        />
      </div>
      <div class="input-block">
        <div class="input-title">
          Fee
          <div class="sub">
            1 for 1% After the settlement, a portion of the tokens will be
            awarded to the creator
          </div>
        </div>
        <input type="number" placeholder="e.g. 5" v-model="contract_info.fee" />
      </div>
      <div class="input-block" v-if="contract_info.checked_address">
        <div class="input-title">Coin Info</div>
        <div class="group">
          <div class="coin-info-block">
            Token Symbol :{{ token_info.symbol }}
          </div>

          <button class="btn" @click="change_token">Change Token</button>
        </div>
      </div>
      <div class="input-block" v-else>
        <div class="input-title">
          Coin Address
          <div class="sub">should be the address of token</div>
        </div>
        <div class="group" v-if="token_list">
          <div class="select-group">
            <select
              name=""
              id=""
              v-model="selectTokenName"
              placeholder="Please select the token"
              @change="select_token"
            >
              <option
                :value="tokenName"
                v-for="(tokenAddress, tokenName) in token_list"
                :key="tokenName"
              >
                {{ tokenName }}:{{ tokenAddress }}
              </option>
              <option value="Other" key="Other">Other</option>
            </select>
          </div>
        </div>
        <div class="group" v-if="selectTokenName == 'Other'">
          <input type="text" v-model="contract_info.coin_address" />
          <button class="btn" @click="load_token">Load Token</button>
        </div>
      </div>
      <button
        class="btn"
        @click="createContract"
        v-if="contract_info.checked_address"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import { create } from "ipfs-http-client";
import bank_abi from "@/abi/bank_abi.json";
// TODO 修改bank名称
import Mixin from "@/mixin/mixin.vue";

export default {
  mixins: [Mixin],

  data() {
    return {
      step: 2,
      ifps: null,
      selectTokenName: null,
      loading: {
        basic_loading: false,
        contract_loading: false,
      },
      basic_info: {
        title: "",
        description: "",
        options: [],
        deadline: 0,
      },
      contract_info: {
        metahash: "",
        share_price: null,
        fee: null,
        coin_address: "",
        checked_address: false,
      },
      token_info: {
        name: "",
        symbol: "",
        address:""
      },
    };
  },
  computed: {
    token_list() {
      return this.networkInfo ? this.networkInfo.token_list : [];
    },
  },

  async mounted() {
    let self = this;
    const ipfs = await create("https://ipfs.infura.io:5001");
    self.ipfs = ipfs;
  },

  methods: {
    select_token() {
      let self = this;

      let token_name = self.selectTokenName;
      console.log(token_name);
      if (token_name == "Other") {
        return;
      }
      let token_addr = self.token_list[token_name];
      self.token_info = { symbol: token_name, address: token_addr };
      self.contract_info.checked_address = true;
    },
    change_token() {
      let self = this;
      self.token_info = { symbol: "", address: "" };
      self.selectTokenName = null;
      self.contract_info.checked_address = false;
    },

    async uploadJson() {
      let self = this;
      self.loading.basic_loading = true;
      let ddl = parseInt(Date.now() / 1000) + 60 * 60 * 24 * 60;
      self.basic_info.deadline = ddl;
      let predInfo = self.basic_info;
      if (
        predInfo.title &&
        predInfo.description &&
        predInfo.options.length == 2 &&
        predInfo.deadline
      ) {
        let result = await self.ipfs.add(JSON.stringify(predInfo));
        let url = `https://ipfs.infura.io/ipfs/${result.path}`;
        self.contract_info.metahash = result.path;
        let info = await self.$http.get(url);
        self.step = 2;
        self.loading.basic_loading = false;
      } else {
        alert("bad info");
        self.loading.basic_loading = false;
      }
    },
    async createContract() {
      let self = this;
      self.loading.contract_loading = true;
      let ddl = parseInt(Date.now() / 1000) + 60 * 60 * 24 * 60;

      let i = self.contract_info;
      let coin_address = self.token_info.address;
      console.log("coin_address",coin_address)
      let share_price = self.$ethers.utils.parseEther(i.share_price + "");
      console.log("coin_address", coin_address);
      let info = {
        hash: i.metahash,
        share_price,
        fee: i.fee,
        coinType: 1,
        coin_address,
        ddl,
      };
      console.log("contractInfo", info);
      self.factoryContract
        .CreatePrediction(i.metahash, share_price, i.fee, 1, coin_address, ddl)
        .then(
          async (tx) => {
            let result = await tx.wait();
            self.loading.contract_loading = false;
            let predAddress = result.events[0].args[2];
            alert(
              "Create Prediction Success,the page will redirect to prediction detail page"
            );
            self.$router.push({ name: "Detail", query: { predAddress } });
          },
          (error) => {
            self.dealError(error);
            self.loading.contract_loading = false;
          }
        );
    },
    async load_token() {
      let self = this;
      let tokenContract;
      try {
        let token_address = self.contract_info.coin_address;
        token_address = self.$ethers.utils.getAddress(token_address);
        tokenContract = await new self.$ethers.Contract(
          token_address,
          bank_abi,
          self.web3
        );
      } catch (err) {
        self.$notification.error({ message: err.message });
        console.dir(err);
        return;
      }
      let name = await tokenContract.name();
      let symbol = await tokenContract.symbol();
      let address = self.contract_info.coin_address
      console.log(self.token_info.address)
      self.contract_info.checked_address = true;
      self.token_info = { name, symbol ,address};
    },
  },
};
</script>
<style lang="less">
@keyframes loading {
  0% {
    background-color: rgba(256, 256, 256, 0.1);
    color: white;
    font-size: 12px;
  }
  100% {
    background-color: rgba(256, 256, 256, 0.9);
    color: black;
    font-size: 20px;
  }
}
.loading_cover {
  position: relative;
  &:before {
    animation: loading 0.2s ease-out;
    animation-fill-mode: forwards;
    content: "Loading...";
    // color:black;
    // font-size:20px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    display: flex;
    z-index: 10;
    position: absolute;
    // background-color: rgba(256,256,256,.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.new-prediction {
  color: black;
  .form-box {
    margin-bottom: 20px;
    overflow: hidden;
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    button.btn {
      background-color: black;
      color: white;
      border: unset;
      height: 30px;
      line-height: 30px;
      padding: 0px 10px;
      outline: unset;
      cursor: pointer;
    }
    .submit-btn {
    }
    .input-block {
      color: #35393f;
      margin-bottom: 10px;
      .coin-info-block {
        border: 2px solid black;
        height: 35px;
        line-height: 31px;
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
      }
      .input-title {
        font-size: 14px;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-bottom: 10px;
        .sub {
          font-size: 12px;
          color: #0f1f37;
          margin-left: 10px;
          font-weight: 100;
        }
      }
      .group {
        display: flex;
        align-items: center;
        .btn {
          height: 35px;
          line-height: 35px;
        }
        .select-group {
          width: 100%;
          border: 2px solid black;

          padding: 0px 10px;
          margin-bottom: 20px;
        }
        select {
          width: 100%;
          border: unset;
          outline: unset;
          height: 35px;
          line-height: 35px;
          //   -webkit-appearance: none;
          //   -moz-appearance: none;
          //   appearance: none;
          position: relative;
          option {
            padding: 0px 10px;
          }
        }
      }
      .btn {
      }
      textarea {
        width: 100%;
        outline: unset;
        border: 2px solid black;
        padding: 5px 10px;
      }
      input {
        outline: unset;
        border: 2px solid black;
        height: 35px;
        line-height: 31px;
        padding: 0px 10px;
        width: 100%;
      }
    }
  }
}
</style>
