<template>
  <div class="admin-card" v-if='show'>
    <a-card class="card">
      <div class="content" v-if='voteState==2'>
        <a-card @click="result = 1" :class="{ selected: result == 1 }">
          <div>ASide:{{page_info.options[0]}}</div>
        </a-card>
        <a-card @click="result = 2" :class="{ selected: result == 2 }">
          <div>BSide:{{page_info.options[1]}}</div>
        </a-card>
      </div>

    
      <div class="center-btn" v-if='voteState==0'>
        <a-button type="primary" class="success" block @click="openVote" :loading="loading.open"
          >Open Vote</a-button
        >
      </div>
      <div class="center-btn" v-if='voteState==1'>
        <a-button type="primary" class="success" block @click="stopVote" :loading="loading.stop"
          >Stop Vote</a-button
        >
      </div>
      <div class="center-btn" v-if='voteState==2'>
        <a-button type="primary" class="success" block @click="submitResult" :loading="loading.submit"
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
      result: 1, //管理员设置的结果
      tokenContract: null,
      loading:{
          open:false,
          stop:false,
          submit:false
      }
    };
  },
  async mounted() {
    let self = this;
    if (self.web3) {
      await self.init();
    }

  

  },
  watch:{
       web3(){
          let self = this
           self.init();
      },
      wallet_address(){
          let self = this
          if(self.web3){
              self.init();
          }
      }
  },
  props:["voteState","predAdminAddress","predAddress","page_info"],
  computed:{
      show(){
          let self = this
            return this.predAdminAddress==self.wallet_address&&this.voteState!=3
      }
  },
  methods: {
   
    async init() {
      let self = this;

      
    },
    async openVote() {
      let self = this;
      self.loading.open = true
      self.predContract.startVoting().then(
        async (tx) => {
          await tx.wait();
          self.$notification.info({message:"success"});
          self.$emit("refresh")
      self.loading.open = false

        },
        (error) => {
          self.dealError(error);
      self.loading.open = false

        }
      );
    },
    async stopVote() {
      let self = this;
      self.loading.stop = true

      self.predContract.stopVoting().then(
        async (tx) => {
          await tx.wait();
          self.$notification.info({message:"success"});
      self.loading.stop = false


        },
        (error) => {
          self.dealError(error);
      self.loading.stop = false
          self.$emit("refresh")


        }
      );
    },
    async submitResult() {
      let self = this;
      self.loading.submit = true

      self.predContract.arbitrate(self.result).then(
        async (tx) => {
          await tx.wait();
      self.loading.submit = false
          self.$emit("refresh")


        },
        (error) => {
          self.dealError(error);
      self.loading.submit = false

        }
      );
    },
  },
};
</script>
<style lang="less">
.admin-card {
  .center-btn {
    margin-bottom: 10px;
  }
  .ant-card {
    cursor: pointer;
    &.selected {
      .ant-card-body {
        background-color: #202127;
        color: white;
      }
    }
  }
}
</style>
