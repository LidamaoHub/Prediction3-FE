<template>
  <div class="detail-page">
        <a-spin :spinning="loading.basic_loading">
          <a-card hoverable class="card">
            <div class="card-title">Topic:&nbsp;{{ page_info.title }}</div>
            <div class="description">
              Description:&nbsp;{{ page_info.description }}
            </div>
            <div class="content">
              <a-card>
                <div>A Side:{{ page_info.options[0] }}</div>
              </a-card>
              <a-card>
                <div>B Side:{{ page_info.options[1] }}</div>
              </a-card>
            </div>
            <a-steps
              :current="vote_info.voteState"
              size="small"
              class="detail-step"
            >
              <a-step title="Step1">
                <span slot="description" class="small-desc">Pending</span>
              </a-step>

              <a-step title="Step2">
                <span slot="description" class="small-desc">Voting</span>
              </a-step>
              <a-step title="Step3">
                <span slot="description" class="small-desc"
                  >In Arbitration</span
                >
              </a-step>

              <a-step title="End" />
            </a-steps>
            <div class="pred-info-vertical">
              <div class="pred-intro">
                Votes
                <div class="desc">{{ vote_info.allShares }}</div>
              </div>
              <div class="pred-intro">
                Liquidity
                <div class="desc">
                  {{ vote_info.allShares * vote_info.sharePrice }}
                  {{ token_info.token_name }}
                </div>
              </div>
              <div class="pred-intro">
                Arbiter
                <div class="desc">{{ vote_info.arbiter }}</div>
              </div>
              <template v-if="userShares">
                <div class="pred-intro">
                  Your Side
                  <div class="desc">{{ userSide }}</div>
                </div>
                <div class="pred-intro">
                  Your Shares
                  <div class="desc">{{ userShares }}</div>
                </div>
                <div class="pred-intro" v-if="winner">
                  Winner
                  <div class="desc">{{ winner }}</div>
                </div>
              </template>
            </div>
          </a-card>
        </a-spin>

        <a-spin
          :spinning="loading.basic_loading"
          v-if="vote_info.voteState > 0"
        >
          <a-card hoverable class="card">
            <div class="pred-info" style="margin-bottom: 20px">
              <a-statistic
                title="Token"
                :value="token_info.token_name"
              ></a-statistic>
              <a-statistic title="Amount/Share" :value="vote_info.sharePrice" />

              <a-statistic title="Max Shares" :value="200" />
            </div>
            <div class="progress-block" style="margin-bottom: 20px">
              <div class="left">
                <div class="text">
                  Yes
                  <div class="right-text">
                    {{ vote_info.percentA }}%
                    <template v-if="vote_info.shareA">
                      - {{ vote_info.shareA }}
                      {{ token_info.token_name }}</template
                    >
                  </div>
                </div>
                <a-progress
                  :percent="vote_info.percentA"
                  :showInfo="false"
                  strokeColor="#F2992E"
                />
              </div>
              <div class="right">
                <!-- <div class="win"><a-icon type="trophy" />WIN</div> -->
                <a-button type="primary" class="first" @click="openModal('1')"
                  >Support A</a-button
                >
              </div>
            </div>
            <div class="progress-block">
              <div class="left">
                <div class="text">
                  No
                  <div class="right-text">
                    {{ vote_info.percentB }}%
                    <template v-if="vote_info.shareB">
                      - {{ vote_info.shareB }}
                      {{ token_info.token_name }}</template
                    >
                  </div>
                </div>
                <a-progress
                  :percent="vote_info.percentB"
                  :showInfo="false"
                  strokeColor="#539ECC"
                />
              </div>
              <div class="right">
                <a-button type="primary" class="second" @click="openModal('2')">
                  Support B
                </a-button>
              </div>
            </div>
          </a-card>
        </a-spin>

        <a-card
          class="card"
          v-if="vote_info.voteState == 3 && canClaimAmount > 0"
        >
          <div class="pred-info-vertical" style="margin-bottom: 20px">
            <div class="pred-intro">
              Your Side
              <div class="desc">{{ userSide }}</div>
            </div>
            <div class="pred-intro">
              Your Shares
              <div class="desc">{{ userShares }}</div>
            </div>
            <div class="pred-intro">
              All Shares
              <div class="desc">{{ vote_info.allShares }}</div>
            </div>
            <div class="pred-intro">
              Fee
              <div class="desc">{{ vote_info.fee }}%</div>
            </div>
            <div class="pred-intro">
              You Can Claim
              <div class="desc">
                {{ canClaimAmount }} {{ token_info.token_name }}
              </div>
            </div>
          </div>
          <div class="center-btn">
            <!-- TODO loading -->
            <a-button
              type="primary"
              class="success"
              block
              @click="claim"
              :loading="loading.claimLoading"
              >Claim {{ canClaimAmount }} {{ token_info.token_name }}</a-button
            >
          </div>
        </a-card>

        <admin-card
          @refresh="init()"
          :voteState="vote_info.voteState"
          :predAdminAddress="vote_info.arbiter"
          :predAddress="pred_address"
        />

      <a-modal
        v-model="showModal"
        title="Vote The Predict"
        class="voteModal"
        @cancel="closeModal"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading.modal_loading"
            @click="vote"
            v-if="allowance > 0"
          >
            Submit Your Predict
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading.modal_loading"
            @click="approve"
            v-else
          >
            Approve Your {{ token_info.token_name }}
          </a-button>
        </template>
        <div class="modal-title">Select your side</div>

        <a-radio-group
          v-model="voteModal.side"
          button-style="solid"
          style="margin-bottom: 10px"
        >
          <a-radio-button value="1"> SideA </a-radio-button>
          <a-radio-button value="2"> SideB </a-radio-button>
        </a-radio-group>
        <div class="modal-title">Select your shares</div>

        <a-row :gutter="10">
          <a-col :span="18">
            <a-slider
              v-model="voteModal.amount"
              :min="1"
              :max="voteMax"
              :step="1"
            />
          </a-col>
          <a-col :span="4">
            <a-input-number
              v-model="voteModal.amount"
              :min="1"
              :max="voteMax"
            />
          </a-col>
        </a-row>
      </a-modal>

  </div>
</template>
<script>
import config from "@/config";
import Mixin from "@/mixin/mixin.vue";

import AdminCard from "@/components/AdminCard";
import pred_abi from "@/abi/pred_abi.json";
import bank_abi from "@/abi/bank_abi.json";
const token_address = config.token_address;


export default {
  mixins: [Mixin],
  components: {  AdminCard },
  data() {
    return {
      change_network: false,
      showModal: false,
      loading: {
        claimLoading: false,
        basic_loading: true,
        modal_loading: false,
      },
      pred_address: "",
      page_info: {
        deadline: 0,
        description: "",
        options: ["", ""],
        title: "",
      },

      contract: null,
      userShares: 0,
      userSide: null,
      voteMax: 200,
      allowance: 0,
      winner: null,
      voteModal: {
        side: 0,
        amount: 1,
      },
      shareInfo: {
        claimed: false,
      },
      vote_info: {
        fee: 0,
        publishState: 0,
        allShares: 0,
        sharePrice: 0,
        arbiter: "",
        voteState: 1,
        percentA: 0,
        percentB: 0,
        shareA: 0,
        shareB: 0,
        pred_intro_hash: "",
      },
      token_info: {
        token_name: "",
      },
    };
  },
  async created() {},
  async mounted() {
    let self = this;
    if (self.web3) {
      self.init();
    }
  },
  watch: {
    async web3() {
      let self = this;
      self.init();
    },
    async wallet_address() {
      let self = this;
      self.getUserShare();
      self.init();
    },
  },
  methods: {
    async claim() {
      let self = this;
      self.loading.claimLoading = true;
      let signer = self.web3.getSigner();
      let contract = self.contract.connect(signer);
      contract.claim().then(
        async (tx) => {
          await tx.wait();
          self.$notification.info({ message: "Claim Success" });
          self.loading.claimLoading = false;
        },
        (error) => {
          self.dealError(error);
          self.loading.claimLoading = false;
        }
      );
    },
    async init() {
      //TODO userSide 变更后没有改变
      let self = this;
      let pageInfo = self.$route;
      let pred_address = pageInfo.query.pred_address;
      self.pred_address = pred_address;
      let signer = self.web3.getSigner();
      
      let contract = await new self.$ethers.Contract(
        pred_address,
        pred_abi,
        self.web3
      );
      contract = contract.connect(signer)
      self.$store.commit('setPredContract',{contract})
      let tokenContract = await new self.$ethers.Contract(
        token_address,
        bank_abi,
        self.web3
      );
      self.contract = contract;
      self.tokenContract = tokenContract;
      await self.initBasicInfo();
      self.loading.basic_loading = false;
      await self.getAllowance();
      await self.getUserShare();
      let claimed = await self.contract.claimedList(self.wallet_address);
      self.shareInfo.claimed = claimed;
    },
    fromWei(num) {
      return this.$ethers.utils.formatEther(num);
    },

    async approve() {
      let self = this;
      self.loading.modal_loading = true;
      let signer = self.web3.getSigner();
      let tokenContract = self.tokenContract.connect(signer);
      tokenContract
        .approve(self.pred_address, self.$ethers.utils.parseEther("200000000"))
        .then(
          async (result) => {
            await result.wait();
            await self.getAllowance();
            self.loading.modal_loading = false;
          },
          (error) => {
            self.loading.modal_loading = false;
            self.dealError(error);
          }
        );
    },

    async getAllowance() {
      let self = this;

      let allowance = await self.tokenContract.allowance(
        self.wallet_address,
        self.pred_address
      );
      self.allowance = parseInt(Number(allowance));
    },
    closeModal() {
      let self = this;
      self.showModal = false;
      self.voteModal = {
        side: 0,
        amount: 1,
      }
    },
    openModal(side) {
      let self = this;
      self.voteModal.side = side;
      self.showModal = true;
    },
    async vote() {
      let self = this;
      self.loading.modal_loading = true;
      let signer = self.web3.getSigner();
      let tokenContract = self.tokenContract.connect(signer);
      let contract = self.contract.connect(signer);
      contract.voteERC20(self.voteModal.side, self.voteModal.amount).then(
        async (tx) => {
          await tx.wait();
          self.closeModal();

          self.loading.modal_loading = false;
          self.initBasicInfo();
          self.getUserShare();
        },
        (error) => {
          self.loading.modal_loading = false;
          self.dealError(error.data);
        }
      );
    },
    async getUserShare() {
      let self = this;
      let address = self.wallet_address;
      let shareInfo = await self.contract.getUserShares(address);
      self.userShares = parseInt(Number(shareInfo[1]));
      let userSide = shareInfo[0];
      if (userSide == 1 || userSide == 2) {
        self.userSide = ["SideA", "SideB"][userSide - 1];
        self.voteMax = 200 - self.userShares;
      }
    },
    async initBasicInfo() {
      let self = this;
      let predInfo = await self.contract.predictionInfo();
      let token_name = await self.tokenContract.symbol();
      self.token_info.token_name = token_name;
      let [
        publishState,
        voteState,
        sideAShares,
        sideBShares,
        CoinAddress,
        arbiter,
        sharePrice,
        fee,
        pred_intro_hash,
      ] = predInfo;
      sideAShares = parseInt(Number(sideAShares));
      sideBShares = parseInt(Number(sideBShares));

      sharePrice = parseInt(self.$ethers.utils.formatEther(sharePrice));
      let allShares = sideAShares + sideBShares;
      let percentA, percentB;
      if (allShares == 0) {
        percentA = percentB = 0;
      } else {
        percentA = parseFloat(((sideAShares / allShares) * 100).toFixed(2));
        percentB = parseFloat(((sideBShares / allShares) * 100).toFixed(2));
      }

      self.vote_info = {
        publishState,
        allShares,
        sharePrice,
        arbiter,
        voteState,
        percentA,
        percentB,
        fee,
        pred_intro_hash,
        shareA: sideAShares,
        shareB: sideBShares,
      };
      if (voteState == 3) {
        let winner = await self.contract.winner();
        self.winner = parseInt(winner) == 1 ? "SideA" : "SideB";
      }
      console.log(voteState,"voteState");
      self.$http
        .get(`https://ipfs.infura.io/ipfs/${pred_intro_hash}`)
        .then((data) => {
          console.log("page_info", data.data);
          self.page_info = data.data;
        });
    },
  },
  computed: {
    canClaimAmount() {
      // TODO 失败怎么还能看,不显示claim框
      let self = this;
      if (self.shareInfo.claimed) {
        return 0;
      }
      if (self.userSide != self.winner) {
        return 0;
      }
      if (self.vote_info.voteState == 3) {
        let sideShare =
          self.userSide == "SideA"
            ? self.vote_info.shareA
            : self.vote_info.shareB;
        let num1 = Number(
          ((self.userShares * self.vote_info.allShares) / sideShare) *
            ((100 - self.vote_info.fee) / 100)
        );
        let canClaim = Number(num1).toFixed(2);
        return canClaim;
      } else {
        return 0;
      }
    },
  },
};
</script>
<style lang="less">
.voteModal {
  .modal-title {
    margin-bottom: 10px;
    font-weight: bold;
  }
}
.detail-page {
  

  .ant-btn-primary {
    &.first {
      background-color: #f2992e;
      border-color: #f2992e;
    }
    &.second {
      background-color: #539ecc;
      border-color: #539ecc;
    }
    &.success {
      background-color: #56bc8a;
      border-color: #56bc8a;
    }
  }
  .inline {
    display: flex;
    align-items: center;
  }
  .card {
    border-radius: 5px;
    margin-bottom: 20px;
    .card-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .description {
      margin-bottom: 20px;
      font-size: 14px;
    }
    .small-desc {
      font-size: 12px;
    }
    .center-btn {
      display: flex;
      justify-content: center;
    }
    .progress-block {
      font-weight: bold;
      display: flex;
      align-items: center;
      .left {
        width: 400px;
        margin-right: 20px;
        .text {
          display: flex;
          .right-text {
            margin-left: auto;
          }
        }
      }
      .right {
        margin-left: auto;
        .win {
          font-size: 30px;
          font-weight: bold;
          i {
            margin-right: 5px;
            font-size: 25px;
          }
        }
      }
    }
    .content {
      margin-bottom: 20px;
      display: flex;

      .ant-card {
        width: 100%;
        .ant-card-body {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
        }

        &:first-child {
          margin-right: 20px;
        }
      }
    }
    .pred-info-vertical {
      .pred-intro {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        .desc {
          margin-left: auto;
          font-weight: bold;
        }
      }
    }
    .pred-info {
      display: flex;
      justify-content: space-between;
    }
    .detail-step {
      margin-bottom: 20px;
    }
  }
}
</style>
