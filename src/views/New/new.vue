<template>
  <div class="new-prediction">
    <div
      class="form-box"
      :class="{
        edit_desc: step == 1,
        edit_contract: step == 2,
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
        <div class="group" style="margin-top: 8px;margin-bottom: 20px">
          <div class="coin-info-block">
            Token Symbol :{{ token_info.symbol }}
          </div>
          <button class="btn" @click="change_token">Change</button>
        </div>
      </div>
      <div class="input-block" v-else>
        <div class="input-title">
          Coin Address
          <div class="sub">should be the address of token</div>
        </div>
        <div class="group" v-if="token_list">
          <!-- <div class="select-group"> -->
            <TySelect :list="token_list" v-model="selectTokenName" @changeValue="select_token" style="margin-bottom:20px" />
            <!-- <select
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
            </select> -->
          <!-- </div> -->
        </div>
        <div class="group" v-if="selectTokenName == 'Other'">
          <input type="text" v-model="contract_info.coin_address" />
          <button class="btn" @click="load_token">Load</button>
        </div>
      </div>
      <div class="submit-btn">
        <button
          class="btn"
          @click="createContract"
          v-if="contract_info.checked_address"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="loading-cover" v-if="loading.contract_loading">
      <div class="loading-content">
        <img src="@/assets/images/loading.png" alt="">
        <p>loading...</p>
      </div>
    </div>
  </div>
</template>
<script>
import { create } from "ipfs-http-client";
import bank_abi from "@/abi/bank_abi.json";
// TODO 修改bank名称
import Mixin from "@/mixin/mixin.vue";
import TySelect from '@/components/Select';
import { getInfo } from '../../http/api'
export default {
  mixins: [Mixin],
  components: { TySelect },
  data() {
    return {
      step: 1,
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
      return this.networkInfo ? this.networkInfo.token_list : {};
    },
  },

  async mounted() {
    let self = this;
    const projectId = '2F9wcLT9HmZV97OM9FU4duaMr48';
    const projectSecret = 'aedf125bf62129c57cfee37a7453d7d5';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    // const ipfs = await create("https://ipfs.infura.io:5001");
    const client = await create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    })
    self.ipfs = client;
  },

  methods: {
    select_token(e) {
      let self = this;
      self.selectTokenName = e
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
      console.log(predInfo)
      if (
        predInfo.title &&
        predInfo.description &&
        predInfo.options.length == 2 &&
        predInfo.deadline
      ) {
        let result = await self.ipfs.add(JSON.stringify(predInfo));
        console.log(predInfo, result)
        // let url = `https://ipfs.infura.io/ipfs/${result.path}`;
        self.contract_info.metahash = result.path;
        // let info = await self.$http.get(url);
        let info = await self.ipfs.get(result.path);
        // await getInfo({arg: result.path})
        console.log(info)
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
.new-prediction {
  color: black;
  width: 560px;
  margin: auto;
  font-family: 'Inter';
  .form-box {
    margin-top: 32px;
    overflow: hidden;
    padding-bottom: 200px;
    .title {
      font-family: 'Avenir';
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 33px;
      color: #1E2022;
      margin-bottom: 24px;
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
      .btn {
        width: 560px;
        height: 44px;
        background: #1E2022;
        border-radius: 2px;
        margin-top: 4px;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        font-family: 'Inter';
      }
    }
    .input-block {
      margin-bottom: 20px;
      .coin-info-block {
        width: 560px;
        height: 44px;
        background: #FFFFFF;
        border: 1px solid #E8EAEF;
        border-radius: 2px;
        padding: 0 16px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        color: #1E2022;
        display: flex;
        align-items: center;
      }
      .input-title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        color: #1E2022;
        display: flex;
        align-items: center;
        .sub {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          margin-left: 16px;
          color: #8796A3;
        }
      }
      .group {
        display: flex;
        align-items: center;
        input {
          margin: 0;
        }
        .btn {
          width: 72px;
          height: 44px;
          background: #1E2022;
          border-radius: 2px;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          text-align: right;
          color: #FFFFFF;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .select-group {
          width: 560px;
          height: 44px;
          background: #FFFFFF;
          border: 1px solid #E8EAEF;
          border-radius: 2px;
          margin-top: 8px;
          margin-bottom: 20px;
          padding: 0 16px;
        }
        select {
          height: 100%;
          width: 100%;
          border: none;
          background: none;
          outline: none;
          option {
            height: 44px !important;
            background: #F3F4F9;
            border-radius: 2px;
          }
        }
      }
      .btn {
      }
      textarea {
        width: 560px;
        height: 100px;
        background: #FFFFFF;
        border: 1px solid #E8EAEF;
        border-radius: 2px;
        margin-top: 8px;
        resize: none;
        outline: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #1E2022;
        padding: 12px 16px;
        box-sizing: border-box;
        &::placeholder {
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #BDC6D0;
        }
      }
      input {
        width: 560px;
        height: 44px;
        background: #FFFFFF;
        border: 1px solid #E8EAEF;
        border-radius: 2px;
        margin-top: 8px;
        outline: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #1E2022;
        padding: 0 16px;
        box-sizing: border-box;
        font-style: normal;
        &::placeholder {
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #BDC6D0;
        }
      }
    }
  }
  .loading-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 80px;
    bottom: 0;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(22px);
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-content {
      text-align: center;
      img {
        width: 40px;
        height: 40px;
        animation: loading 1.5s linear infinite;
      }
      p {
        font-family: 'Inter';
        margin-top: 32px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        color: #1E2022;
      }
    }
  }
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
