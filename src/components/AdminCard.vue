<template>
  <div class="admin-card" v-if="show">
    <a-card class="card">
      <div class="content" v-if="voteState == 2">
        <div class="content-title">Select the winner</div>
        <div class="content-subtitle">Arbitration results cannot be modified, please select carefully</div>
        <div class="btn-wrap">
          <a-card @click="result = 1" style="margin: 0" :class="['btn-side', 'btn-side-a', { selected: result == 1 }]">
            <div>A Side <br /><span>{{ page_info.options[0] }}</span></div>
            <img v-show="result == 1" src="@/assets/images/select_a.png" alt="" class="select-icon">
          </a-card>
          <a-card @click="result = 2" :class="['btn-side', 'btn-side-b', { selected: result == 2 }]">
            <div>B Side <br /><span>{{ page_info.options[1] }}</span></div>
            <img v-show="result == 2" src="@/assets/images/select_b.png" alt="" class="select-icon">
          </a-card>
        </div>
      </div>

      <div class="center-btn" v-if="voteState == 0">
        <a-button
          type="primary"
          class="center-btn-item center-btn-open"
          block
          :disabled="loading.open"
          @click="openVote"
          :loading="loading.open"
          >Open Vote</a-button
        >
      </div>
      <div class="center-btn" v-if="voteState == 1">
        <a-button
          type="primary"
          class="center-btn-item center-btn-stop"
          block
          @click="stopVote"
          :loading="loading.stop"
          >Stop Vote</a-button
        >
      </div>
      <div class="center-btn" v-if="voteState == 2">
        <a-button
          type="primary"
          class="center-btn-item center-btn-submit"
          block
          @click="submitResult"
          :loading="loading.submit"
          >Submit Result</a-button
        >
      </div>
    </a-card>
  </div>
</template>
<script>
import pred_abi from "@/abi/pred_abi.json";
import config from "@/config";

import Mixin from "@/mixin/mixin.vue";
export default {
  mixins: [Mixin],
  data() {
    return {
      result: 1,
      tokenContract: null,
      loading: {
        open: false,
        stop: false,
        submit: false,
      },
    };
  },
  async mounted() {
    let self = this;
    if (self.web3) {
      await self.init();
    }
  },
  watch: {
    web3() {
      let self = this;
      self.init();
    },
    wallet_address() {
      let self = this;
      if (self.web3) {
        self.init();
      }
    },
  },
  props: ["voteState", "predAdminAddress", "predAddress", "page_info"],
  computed: {
    show() {
      let self = this;
      return (
        this.predAdminAddress == self.wallet_address && this.voteState != 3
      );
    },
  },
  methods: {
    async init() {
      let self = this;
    },
    async openVote() {
      let self = this;
      self.loading.open = true;
      self.predContract.startVoting().then(
        async (tx) => {
          await tx.wait();
          self.$notification.info({ message: "success" });
          self.$emit("refresh");
          self.loading.open = false;
        },
        (error) => {
          self.dealError(error);
          self.loading.open = false;
        }
      );
    },
    async stopVote() {
      let self = this;
      self.loading.stop = true;

      self.predContract.stopVoting().then(
        async (tx) => {
          await tx.wait();
          self.$notification.info({ message: "success" });
          self.loading.stop = false;
          self.$emit("refresh");
        },
        (error) => {
          self.dealError(error);
          self.loading.stop = false;
          self.$emit("refresh");
        }
      );
    },
    async submitResult() {
      let self = this;
      self.loading.submit = true;
      console.log(self.predContract, self.result)
      self.predContract.arbitrate(self.result).then(
        async (tx) => {
          await tx.wait();
          self.loading.submit = false;
          self.$emit("refresh");
        },
        (error) => {
          self.dealError(error);
          self.loading.submit = false;
        }
      );
    },
  },
};
</script>
<style lang="less">
.admin-card {
  .content {
    border: 1px solid #E8EAEF;
    border-radius: 4px;
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .content-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      text-align: center;
      color: #1E2022;
    }
    .content-subtitle {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      margin-top: 8px;
      letter-spacing: 0.03em;
      color: #8796A3;
    }
    .btn-wrap {
      margin-top: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .btn-side {
        flex: 0 0 236px;
        width: 236px;
        height: 70px;
        border: none;
        border-radius: 2px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;
        color: #8796A3;
        cursor: pointer;
        background: #F3F4F9;
        box-sizing: border-box;
        position: relative;
        span {
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          text-align: right;
          margin-top: 8px;
          display: inline-block;
        }
        &.btn-side-a.selected {
          color: #2636C8;
          border: 2px solid rgba(38, 54, 200, 0.3);
        }
        &.btn-side-b.selected {
          color: #1E2022;
          border: 2px solid rgba(30, 32, 34, 0.3);
        }
        .select-icon {
          width: 24px;
          height: 24px;
          position: absolute;
          right: -12px;
          top: -12px;
        }
      }
    }

  }
  .card {
    border: none;
    padding: 0;
    margin: 24px auto 0;
    .ant-card-body {
      padding: 0;
    }
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
      &.center-btn-open {
        background: #2636c8;
      }
      &.center-btn-stop {
        background: #1e2022;
      }
      &.center-btn-submit {
        background: #1e2022;
      }
    }
  }
}
</style>
