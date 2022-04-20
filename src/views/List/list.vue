<template>
  <div class="pred-list">
    <div class="list-card">
      <div class="list-tags">
        <div class="tag active">Latest</div>
      </div>
      <div class="list-items">
        <div class="line" v-for="(line, key) in lines" :key="`pred-${key}`">
          <router-link :to="{name:'Detail',query:{pred_address:line.pred_address}}">
          <div class="line-title">{{ line.title }}</div>
          <div class="line-body">
            <div class="popular sub"><div>{{get_popular_pred(line)}}</div></div>
            <div class="remaining sub">{{line.deadline}}</div>
            <div class="liquidity sub">1000,000 LDM</div>
          </div>
          </router-link>
        </div>
        <div class="line-empty" v-if="empty">
          <span>Empty</span> &nbsp;<span>😅</span>
        </div>
        <div v-if="loading">Loading...</div>
      </div>
    </div>
  </div>
</template>
<script>
import Mixin from "@/mixin/mixin.vue";
import pred_abi from "@/abi/pred_abi.json";

export default {
  mixins: [Mixin],

  data() {
    return {
      lines: [],
      empty:false,
      loading:true
    };
  },
  async mounted() {
    let self = this;
    if (self.factoryContract) {
      await self.getList();
    }
  },
  watch: {
    async factoryContract(a,b) {
      let self = this;
      if(b==null){
      await self.getList();

      }
    },
  },
  methods: {
    get_popular_pred(info) {
      if(info.sideAShares==info.sideBShares==0){
        return "New Prediction"
      }
      if(info.sideAShares==info.sideBShares){
        return "Both Side"
      }
      
      let index = info.sideAShares>info.sideBShares?0:1
      return info.options[index]
    },
    async getList() {
      let self = this;
      let maxId = await self.factoryContract.PredictId();
      maxId = parseInt(maxId);

      if (maxId > 0) {
        maxId -= 1;
        let minId = maxId > 10 ? maxId - 10 : maxId;
        for (let i = maxId; i > -1; i--) {
          try{
            let addr = await self.factoryContract.getPredict(i);
          let predInfo = await self.getPredictionInfo(addr);
          let url = `https://ipfs.infura.io/ipfs/${predInfo.pred_intro_hash}`;

          let info = await self.$http.get(url);
          if (info.status == 200) {
            predInfo = { ...predInfo, ...info.data };
            self.lines.push(predInfo);
            self.empty = false
          }
          }catch{

          }
          
        }
        if(self.lines.length==0){
          self.empty = true
        }
        
      }else{
        self.empty = true
      }
      self.loading = false
    },
  },
};
</script>
<style lang="less">
.pred-list {
  color: black;
  .list-card {
    .list-tags {
      display: flex;
      margin-bottom: 20px;
      .tag {
        &.active {
          background-color: #19202e;
          color: white;
        }
        padding: 0px 15px;
        height: 35px;
        line-height: 35px;
      }
    }
    .list-items {
      .line-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        border: 1px dashed black;
        border-radius: 5px;
        color: #9cabbb;
        height: 150px;
      }
      .line {
        padding: 15px 0px;
        transition: padding 0.5s ease-out;
        cursor: pointer;
        &:hover {
          background-color: black;
          color: white;
          padding: 15px 20px;
          .line-body {
            .sub {
              color: #e7ecf1;
            }
          }
        }
        .line-title {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .line-body {
          .sub {
            color: #35393f;
          }

          display: flex;
          align-items: center;
          .popular,
          .remaining {
            margin-right: 10px;
          }
          .popular {
            display: flex;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
