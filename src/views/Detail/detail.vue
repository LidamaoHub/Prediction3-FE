<template>
  <div class="detail-page" :class="{ withShadow: showVModal }">
    <div class="steps">
      <a-steps
        :current="vote_info.voteState"
        size="small"
        class="detail-step"
      >
        <a-step title="">
          <div slot="description" class="small-desc">Pending</div>
        </a-step>

        <a-step title="">
          <div slot="description" class="small-desc">Voting</div>
        </a-step>
        <a-step title="">
          <div slot="description" class="small-desc">In Arbitration</div>
        </a-step>

        <a-step title="" >
          <div slot="description" class="small-desc">Result</div>
        </a-step>
      </a-steps>
    </div>
    <div class="info">
      <div class="info-hd">
        <div class="info-title">{{page_info.title}}</div>
        <div class="info-operation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="share">
            <path d="M8.68408 13.3419C8.88608 12.9379 9.00008 12.4819 9.00008 11.9999C9.00008 11.5179 8.88608 11.0619 8.68408 10.6579M8.68408 13.3419C8.38178 13.9463 7.88428 14.4309 7.27217 14.7172C6.66007 15.0036 5.96921 15.0749 5.31152 14.9196C4.65384 14.7643 4.06785 14.3915 3.64849 13.8615C3.22914 13.3316 3.00098 12.6756 3.00098 11.9999C3.00098 11.3241 3.22914 10.6681 3.64849 10.1382C4.06785 9.60828 4.65384 9.23547 5.31152 9.08017C5.96921 8.92486 6.66007 8.99616 7.27217 9.28251C7.88428 9.56886 8.38178 10.0535 8.68408 10.6579M8.68408 13.3419L15.3161 16.6579M8.68408 10.6579L15.3161 7.34187M15.3161 16.6579C14.9602 17.3697 14.9016 18.1938 15.1533 18.9488C15.4049 19.7038 15.9462 20.3279 16.6581 20.6839C17.3699 21.0398 18.194 21.0984 18.949 20.8467C19.704 20.595 20.3282 20.0537 20.6841 19.3419C21.04 18.63 21.0986 17.806 20.8469 17.0509C20.5952 16.2959 20.0539 15.6718 19.3421 15.3159C18.9896 15.1396 18.6059 15.0346 18.2128 15.0066C17.8197 14.9787 17.425 15.0284 17.0511 15.1531C16.2961 15.4047 15.672 15.946 15.3161 16.6579ZM15.3161 7.34187C15.4923 7.69427 15.7362 8.00851 16.0339 8.26665C16.3316 8.52478 16.6772 8.72176 17.051 8.84633C17.4248 8.9709 17.8195 9.02062 18.2125 8.99266C18.6055 8.9647 18.9892 8.8596 19.3416 8.68337C19.694 8.50714 20.0082 8.26322 20.2664 7.96554C20.5245 7.66786 20.7215 7.32226 20.846 6.94845C20.9706 6.57465 21.0203 6.17997 20.9924 5.78695C20.9644 5.39394 20.8593 5.01027 20.6831 4.65787C20.3272 3.94616 19.7031 3.40499 18.9482 3.15341C18.1932 2.90183 17.3693 2.96045 16.6576 3.31637C15.9459 3.67229 15.4047 4.29636 15.1531 5.05129C14.9015 5.80621 14.9602 6.63016 15.3161 7.34187Z" stroke="#8796A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-if="!isCollectList" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="collect">
            <path d="M12.9511 2.92708C12.6521 2.00608 11.3491 2.00608 11.0491 2.92708L9.5301 7.60108C9.46467 7.80173 9.33744 7.97654 9.16662 8.10048C8.9958 8.22442 8.79014 8.29113 8.5791 8.29108H3.6651C2.6971 8.29108 2.2931 9.53108 3.0771 10.1011L7.0531 12.9891C7.22389 13.1132 7.351 13.2883 7.4162 13.4891C7.48141 13.6899 7.48137 13.9063 7.4161 14.1071L5.8981 18.7811C5.5981 19.7021 6.6531 20.4691 7.4361 19.8991L11.4121 17.0111C11.583 16.8869 11.7888 16.8199 12.0001 16.8199C12.2114 16.8199 12.4172 16.8869 12.5881 17.0111L16.5641 19.8991C17.3471 20.4691 18.4021 19.7031 18.1021 18.7811L16.5841 14.1071C16.5188 13.9063 16.5188 13.6899 16.584 13.4891C16.6492 13.2883 16.7763 13.1132 16.9471 12.9891L20.9231 10.1011C21.7061 9.53108 21.3041 8.29108 20.3351 8.29108H15.4201C15.2092 8.29092 15.0038 8.22411 14.8332 8.10018C14.6625 7.97626 14.5355 7.80157 14.4701 7.60108L12.9511 2.92708Z" stroke="#8796A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="unCollect">
            <path d="M12.9511 2.92708C12.6521 2.00608 11.3491 2.00608 11.0491 2.92708L9.5301 7.60108C9.46467 7.80173 9.33744 7.97654 9.16662 8.10048C8.9958 8.22442 8.79014 8.29113 8.5791 8.29108H3.6651C2.6971 8.29108 2.2931 9.53108 3.0771 10.1011L7.0531 12.9891C7.22389 13.1132 7.351 13.2883 7.4162 13.4891C7.48141 13.6899 7.48137 13.9063 7.4161 14.1071L5.8981 18.7811C5.5981 19.7021 6.6531 20.4691 7.4361 19.8991L11.4121 17.0111C11.583 16.8869 11.7888 16.8199 12.0001 16.8199C12.2114 16.8199 12.4172 16.8869 12.5881 17.0111L16.5641 19.8991C17.3471 20.4691 18.4021 19.7031 18.1021 18.7811L16.5841 14.1071C16.5188 13.9063 16.5188 13.6899 16.584 13.4891C16.6492 13.2883 16.7763 13.1132 16.9471 12.9891L20.9231 10.1011C21.7061 9.53108 21.3041 8.29108 20.3351 8.29108H15.4201C15.2092 8.29092 15.0038 8.22411 14.8332 8.10018C14.6625 7.97626 14.5355 7.80157 14.4701 7.60108L12.9511 2.92708Z" fill="#1E2022" stroke="#1E2022" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>
      </div>
      <div class="info-desc">{{page_info.description}}</div>
      <div class="info-votes info-item">
        <div class="info-item-key">Votes</div>
        <div class="info-item-value">{{vote_info.allShares}}</div>
      </div>
      <div class="info-arbiter info-item">
        <div class="info-item-key">Arbiter</div>
        <div class="info-item-value">{{vote_info.arbiter}}</div>
      </div>
      <div v-if="vote_info.voteState == 3 && canClaimAmount > 0">
        <div class="info-arbiter info-item">
          <div class="info-item-key">Your Side</div>
          <div class="info-item-value">{{userSide}}</div>
        </div>
        <div class="info-arbiter info-item">
          <div class="info-item-key">Your Shares</div>
          <div class="info-item-value">{{userShares}}</div>
        </div>
        <div class="info-arbiter info-item">
          <div class="info-item-key">Fee</div>
          <div class="info-item-value">{{ vote_info.fee }}%</div>
        </div>
        <div class="info-arbiter info-item">
          <div class="info-item-key">Winner</div>
          <div class="info-item-value">{{winner}}</div>
        </div>
        <div class="info-arbiter info-item">
          <div class="info-item-key">You Can Claim</div>
          <div class="info-item-value">{{ canClaimAmount }} {{ token_info.token_name }}</div>
        </div>
      </div>
    </div>
    <div class="pred-info" v-if="vote_info.voteState > 0">
      <div class="pred-info-hd">
        <div class="pred-info-hd-item">
          <div class="pred-info-hd-item-key">Token</div>
          <div class="pred-info-hd-item-value">{{token_info.token_name}}</div>
        </div>
        <div class="pred-info-hd-item">
          <div class="pred-info-hd-item-key">Max Shares</div>
          <div class="pred-info-hd-item-value">{{vote_info.sharePrice}}</div>
        </div>
      </div>
      <div class="progress-block">
        <div class="progress-item">
          <div class="progress-item-l">
            <div class="item-share">A: {{page_info && page_info.options && page_info.options[0] || ''}}
              <span>{{ vote_info.percentA }}% <template v-if="vote_info.shareA"> - {{ vote_info.shareA }} {{ token_info.token_name }}</template></span>
            </div>
            <div class="progress-item-block">
              <div class="progress-percent" :style="{width: vote_info.percentA + '%'}"></div>
            </div>
          </div>
          <div :class="['progress-item-r', userSide == 'SideB' ? 'progress-item-r-not' : userSide == 'SideA' ? 'progress-item-r-s-a' : '']" @click="openModal('A', page_info.options[0], 1)">Support A
            <img v-if="userSide == 'SideA'" src="@/assets/images/select_a.png" alt="">
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-item-l">
            <div class="item-share">B: {{page_info && page_info.options && page_info.options[1] || ''}}
              <span>{{ vote_info.percentB }}% <template v-if="vote_info.shareB"> - {{ vote_info.shareB }} {{ token_info.token_name }}</template></span>
            </div>
            <div class="progress-item-block">
              <div class="progress-percent" :style="{width: vote_info.percentB + '%', background: '#1E2022'}"></div>
            </div>
          </div>
          <div :class="['progress-item-r', userSide == 'SideA' ? 'progress-item-r-not' : userSide == 'SideB' ? 'progress-item-r-s' : '']" style="background: #1E2022;"  @click="openModal('B', page_info.options[1], 2)">Support B
            <img v-if="userSide == 'SideB'" src="@/assets/images/select_a.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div v-if="vote_info.voteState == 3 && canClaimAmount > 0" class="center-btn">
      <!-- TODO loading -->
      <a-button
        type="primary"
        class="center-btn-item"
        block
        @click="claim"
        :loading="loading.claimLoading"
        >Claim {{ canClaimAmount }} {{ token_info.token_name }}</a-button
      >
    </div>

    <admin-card
      @refresh="init()"
      :voteState="vote_info.voteState"
      :predAdminAddress="vote_info.arbiter"
      :predAddress="predAddress"
      :page_info="page_info"
    />

    <a-modal
      v-model="showModal"
      title="Vote The Predict"
      class="vote-modal"
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
      <div class="modal-title">Your position</div>
      <div class="position-side">{{voteModal.option}}: {{voteModal.sideTitle}}</div>
      <div class="modal-title">Select your shares</div>
      <div class="share-amount">
        <input type="number" v-model="voteModal.amount" :min="1" :max="voteMax">
        <span>{{token_info.token_name}}</span>
      </div>
    </a-modal>
    <v-modal />
  </div>
</template>
<script>
import config from "@/config";
import Mixin from "@/mixin/mixin.vue";
import { getInfo } from '../../http/api'
import VModal from "@/components/Modal";
import AdminCard from "@/components/AdminCard";
import pred_abi from "@/abi/pred_abi.json";
import bank_abi from "@/abi/bank_abi.json";
import {getLs, setLs} from '../../local/local'
export default {
  mixins: [Mixin],
  components: { AdminCard, VModal },
  data() {
    return {
      change_network: false,
      showModal: false,
      loading: {
        claimLoading: false,
        basic_loading: true,
        modal_loading: false,
      },
      predAddress: "",
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
        predIntroHash: "",
      },
      token_info: {
        token_name: "",
      },
      isCollectList: false,
      collectList: []
    };
  },
  async created() {
    getLs('collectList').then(res => {
      this.collectList = res || []
    })
  },
  async mounted() {
    let self = this;
    if (self.web3) {
      self.init();
    }
  },
  watch: {
    collectList() {
      let predAddress = this.$route.query.predAddress
      this.isCollectList = this.collectList.some(e => e.predAddress == predAddress)
    },
    // async web3() {
    //   let self = this;
    //   self.init();
    // },
    async wallet_address() {
      let self = this;
      self.init();
    },
  },
  methods: {
    radioGroupChange(e) {
      console.log(e)
    },
    collect() {
      console.log(this.page_info)
      let collectList = this.collectList || []
      let { title, description } = this.page_info
      let itemData = {
        title,
        description,
        predAddress: this.predAddress
      }
      collectList.push(itemData)
      setLs('collectList', collectList).then(res => {
        console.log(res)
        this.collectList = res || []
      })
    },
    unCollect() {
      let collectList = this.collectList || []
      let predAddress = this.predAddress
      collectList = collectList.filter(e => e.predAddress != predAddress)
      setLs('collectList', collectList).then(res => {
        console.log(res)
        this.collectList = res || []
      })
    },
    share() {
      let value = `${this.page_info.title}: ${window.location.href}`
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value)
        this.$message.success('The shared content was successfully copied', 3);
      }
    },
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
          self.init()
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
      let predAddress = pageInfo.query.predAddress;
      self.predAddress = predAddress;
      let predInfo = await self.getPredictionInfo(predAddress);
      console.log("predInfo", predInfo);
      let allShares = predInfo.sideAShares + predInfo.sideBShares;
      let percentA, percentB;
      if (allShares == 0) {
        percentA = percentB = 0;
      } else {
        percentA = parseFloat(
          ((predInfo.sideAShares / allShares) * 100).toFixed(2)
        );
        percentB = parseFloat(
          ((predInfo.sideBShares / allShares) * 100).toFixed(2)
        );
      }
      self.vote_info = {
        fee: predInfo.fee,
        publishState: predInfo.publishState,
        allShares: allShares,
        sharePrice: predInfo.sharePrice,
        arbiter: predInfo.arbiter,
        voteState: predInfo.voteState,
        percentA,
        percentB,
        shareA: predInfo.sideAShares,
        shareB: predInfo.sideBShares,
        predIntroHash: predInfo.predIntroHash,
      };

      self.$store.commit("setPredContract", { contract: predInfo.contract });

      let tokenContract = await new self.$ethers.Contract(
        predInfo.CoinAddress,
        bank_abi,
        self.web3
      );
      let token_name = await tokenContract.symbol();
      self.token_info.token_name = token_name;
      self.contract = predInfo.contract;
      self.tokenContract = tokenContract;
      self.loading.basic_loading = false;
      await self.getAllowance();
      await self.getUserShare();
      let claimed = await self.contract.claimedList(self.wallet_address);

      self.shareInfo.claimed = claimed;
      if (predInfo.voteState == 3) {
        let winner = await self.contract.winner();
        self.winner = parseInt(winner) == 1 ? "SideA" : "SideB";
      }
      getInfo({arg: predInfo.predIntroHash}).then(res => {
        console.log(res)
        self.page_info = res
      })
      // self.$http
      //   .get(`https://cf-ipfs.com/${predInfo.predIntroHash}`)
      //   .then((data) => {
      //     self.page_info = data.data;
      //   });
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
        .approve(self.predAddress, self.$ethers.utils.parseEther("200000000"))
        .then(
          async (result) => {
            console.log('result', result)
            await result.wait();
            await self.getAllowance();
            self.closeModal()
            self.loading.modal_loading = false;
          },
          (error) => {
            self.loading.modal_loading = false;
            self.dealError(error);
            self.closeModal()
          }
        );
    },

    async getAllowance() {
      let self = this;

      let allowance = await self.tokenContract.allowance(
        self.wallet_address,
        self.predAddress
      );
      console.log(parseInt(Number(allowance)))
      self.allowance = parseInt(Number(allowance));
    },
    closeModal() {
      let self = this;
      self.showModal = false;
      self.voteModal = {
        side: 0,
        amount: 1,
      };
    },
    openModal(options, sideTitle, side) {
      if (this.userShares) return
      let self = this;
      self.voteModal.side = side;
      self.voteModal.sideTitle = sideTitle;
      self.voteModal.option = options;
      self.showModal = true;
    },
    async vote() {
      let self = this;
      self.loading.modal_loading = true;
      let signer = self.web3.getSigner();
      let contract = self.contract.connect(signer);
      let amount = self.voteModal.amount * self.vote_info.sharePrice;
      console.log(amount, self.voteModal.side);
      contract.voteERC20(self.voteModal.side, amount).then(
        async (tx) => {
          await tx.wait();
          self.closeModal();
          self.loading.modal_loading = false;
          self.init();
        },
        (error) => {
          console.log(error)
          self.closeModal();
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
.vote-modal {
  .modal-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: #1E2022;
    margin-bottom: 8px;
    margin-top: 24px;
  }
  .share-amount {
    background: #FFFFFF;
    border: 1px solid #E8EAEF;
    border-radius: 2px;
    display: flex;
    align-items: center;
    width: 352px;
    height: 44px;
    input {
      flex: 1;
      height: 100%;
      border: none;
      background: none;
      outline: none;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.03em;
      color: #1E2022;
    }
    span {
      width: 70px;
      flex: 0 0 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.03em;
      color: #1E2022;
    }
  }
  .position-side {
    width: 352px;
    height: 44px;
    display: flex;
    align-items: center;
    // justify-content: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #1E2022;
    background: #F3F4F9;
    border: 1px solid #E8EAEF;
    border-radius: 2px;
    padding: 0 20px;
  }
}
.detail-page {
  width: 560px;
  margin: auto;
  padding-bottom: 100px;
  .steps {
    background: #FFFFFF;
    border: 1px solid #E8EAEF;
    border-radius: 4px;
    margin-top: 32px;
    width: 560px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 70px;
  }
  .info {
    padding: 32px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E8EAEF;
    border-radius: 4px;
    margin-top: 24px;
    .info-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-title {
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
        color: #1E2022;
      }
      .info-operation {
        svg {
          width: 24px;
          height: 24px;
          cursor: pointer;
          & ~ svg {
            margin-left: 18px;
          }
        }
      }
    }
    .info-desc {
      margin-top: 8px;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      color: #8796A3;
    }
    .info-votes {
      margin-top: 32px;
    }
    // .info-arbiter {
    //   margin-top: 9px;
    // }
    .info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      .info-item-key {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #8796A3;
      }
      .info-item-value {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        text-align: right;
        color: #1E2022;
      }
    }
  }
  .pred-info {
    padding: 32px;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #E8EAEF;
    border-radius: 4px;
    margin-top: 24px;
    .pred-info-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pred-info-hd-item-key {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #8796A3;
      }
      .pred-info-hd-item-value {
        margin-top: 2px;
        font-weight: 500;
        font-size: 30px;
        line-height: 39px;
        color: #1E2022;
      }
    }
    .progress-block {
      .progress-item {
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .progress-item-l {
          flex: 1;
          .item-share {
            font-weight: 500;
            font-size: 16px;
            color: #1E2022;
            display: flex;
            align-items: center;
            span {
              margin-left: 17px;
              font-weight: 400;
              font-size: 13px;
              line-height: 14px;
              text-align: right;
              color: #8796A3;
            }
          }
          .progress-item-block {
            width: 100%;
            height: 8px;
            background: #EBEDF5;
            margin-top: 12px;
            position: relative;
            .progress-percent {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              background: #2636C8;
            }
          }
        }
        .progress-item-r {
          width: 100px;
          height: 36px;
          flex: 0 0 100px;
          margin-left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2636C8;
          border-radius: 2px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          color: #FFFFFF;
          cursor: pointer;
          position: relative;
          img {
            width: 24px;
            height: 24px;
            position: absolute;
            right: -12px;
            top: -12px;
          }
          &.progress-item-r-not {
            background: #F3F4F9 !important;
            color: #8796A3;
            cursor:not-allowed;
          }
          &.progress-item-r-s {
            background: #FFFFFF !important;
            border: 2px solid rgba(30, 32, 34, 0.3);
            color: #1E2022;
            cursor:not-allowed;
          }
          &.progress-item-r-s-a {
            background: #FFFFFF !important;
            border: 2px solid rgba(38, 54, 200, 0.3);
            color: #2636C8;
            cursor:not-allowed;
          }
        }
      }
    }
  }
  &.withShadow {
    filter: blur(7px);
  }
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
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  margin: 0; 
}
input[type=number] {
    -moz-appearance:textfield;
}
.center-btn {
  // margin-bottom: 10px;
  .center-btn-item {
    width: 100%;
    height: 56px;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
    background: #1E2022;
    margin-top: 24px;
    &:hover {
      background: #1E2022;
      border: none;
    }
    &:focus {
      background: #1E2022;
      border: none;
    }

  }
}
</style>
<style lang="less">
.detail-page {
  .ant-steps-item-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .ant-steps {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .ant-steps-item {
    width: 80px;
    flex: 0 0 80px;
    margin: 0 !important;
    position: relative;
    overflow: visible;
    font-weight: 600;
  }
  .ant-steps-item:nth-child(3) {
    width: 100px;
    flex: 0 0 100px;
  }
  .ant-steps-item-title::after {
    display: none;
  }
  .ant-steps-item-description {
    margin-top: 8px;
  }
  .ant-steps-item-description::after {
    content: '';
    width: 40px;
    height: 1px;
    background: #E2E6EA;
    position: absolute;
    top: 12px;
    right: -30px;
  }
  .ant-steps-item:last-child .ant-steps-item-description::after {
    display: none;
  }
  .ant-steps-icon svg {
    fill: #2636C8;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: rgba(38, 54, 200, .4);
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background: #2636C8;
    border-color: #2636C8;
  }
  .ant-steps-item-wait .ant-steps-item-icon {
    border-color: #8796A3;
    color: #8796A3;
    & > .ant-steps-icon {
      color: #8796A3;
    }
  }
}
.vote-modal {
  .ant-modal-wrap  {
    .ant-modal {
      width: 400px !important;
    }
  }
  
  .ant-modal-header {
    padding: 24px;
    padding-bottom: 0;
    border: none;
    box-sizing: border-box;
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    color: #1E2022;
  }
  .ant-modal-body {
    padding: 0 24px;
  }
  .ant-modal-footer {
    border: none;
    padding: 0 24px 24px;
    margin-top: 24px;
    button {
      width: 352px;
      height: 44px;
      background: #1E2022;
      border-radius: 2px;
      border: none;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: none
    }
  }
}
</style>
