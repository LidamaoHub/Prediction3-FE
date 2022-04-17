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
            Token Name : {{ token_info.name }} Token Symbol : {{ token_info.symbol }}
          </div>

          <button class="btn" @click="change_token">Change Token</button>
        </div>
      </div>
      <div class="input-block" v-else>
        <div class="input-title">Coin Address<div class="sub">
           should be the address of token
          </div></div>
        <div class="group">
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
import { mapState } from "vuex";
import { create } from "ipfs-http-client";
import bank_abi from "@/abi/bank_abi.json";
// TODO 修改bank名称
import config from "@/config";
import Mixin from "@/mixin/mixin.vue";

export default {
  mixins: [Mixin],

  data() {
    return {
      step: 1,
      ifps: null,
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
      },
    };
  },

  async mounted() {
    let self = this;
    const ipfs = await create("https://ipfs.infura.io:5001");
    self.ipfs = ipfs;
  },

  methods: {
    change_token() {
      let self = this;
      self.contract_info.checked_address = false;
      self.contract_info.coin_address = "";
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
        console.log(result);
        let url = `https://ipfs.infura.io/ipfs/${result.path}`;
        console.log(url);
        self.contract_info.metahash = result.path;
        let info = await self.$http.get(url);
        self.step = 2;
        self.loading.basic_loading = false;

        console.log(info);
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

      let tx = self.factoryContract
        .CreatePrediction(
          i.metahash,
          i.share_price,
          i.fee,
          1,
          i.coin_address,
          // self.basic_info.deadline
          ddl
        )
        .then(
          async (tx) => {
            let result = await tx.wait();
            console.log(result);
            self.loading.contract_loading = false;
            let pred_address= result.events[0].args[2]
            alert("Create Prediction Success,the page will redirect to prediction detail page")
            self.$router.push({name:"Detail",query:{pred_address}})

            console.log(result.events[0].args);
          },
          (error) => {
            self.dealError(error);
            self.loading.contract_loading = false;
          }
        );
    },
    async load_token() {
      let self = this;
      let token_address = self.contract_info.coin_address;
      let tokenContract = await new self.$ethers.Contract(
        token_address,
        bank_abi,
        self.web3
      );

      let name = await tokenContract.name();
      let symbol = await tokenContract.symbol();
      self.contract_info.checked_address = true;
      self.token_info = { name, symbol };
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
    animation: loading 0.3s ease-out;
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
          line-height:35px;
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
