<template>
  <div class="favorites-page">
    <div v-if="collectList.length" class="collect-list">
      <div class="collect-item" v-for="item in collectList" :key="item.predAddress" @click="toDetail(item.predAddress)">
        <div class="collect-title">{{item.title}}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="unCollect(item.predAddress)">
            <path d="M12.9511 2.92708C12.6521 2.00608 11.3491 2.00608 11.0491 2.92708L9.5301 7.60108C9.46467 7.80173 9.33744 7.97654 9.16662 8.10048C8.9958 8.22442 8.79014 8.29113 8.5791 8.29108H3.6651C2.6971 8.29108 2.2931 9.53108 3.0771 10.1011L7.0531 12.9891C7.22389 13.1132 7.351 13.2883 7.4162 13.4891C7.48141 13.6899 7.48137 13.9063 7.4161 14.1071L5.8981 18.7811C5.5981 19.7021 6.6531 20.4691 7.4361 19.8991L11.4121 17.0111C11.583 16.8869 11.7888 16.8199 12.0001 16.8199C12.2114 16.8199 12.4172 16.8869 12.5881 17.0111L16.5641 19.8991C17.3471 20.4691 18.4021 19.7031 18.1021 18.7811L16.5841 14.1071C16.5188 13.9063 16.5188 13.6899 16.584 13.4891C16.6492 13.2883 16.7763 13.1132 16.9471 12.9891L20.9231 10.1011C21.7061 9.53108 21.3041 8.29108 20.3351 8.29108H15.4201C15.2092 8.29092 15.0038 8.22411 14.8332 8.10018C14.6625 7.97626 14.5355 7.80157 14.4701 7.60108L12.9511 2.92708Z" fill="#1E2022" stroke="#1E2022" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="collect-desc">{{item.description}}</div>
      </div>
    </div>
    <div v-else class="not">Empty</div>
  </div>
</template>
<script>
import {getLs, setLs} from '../../local/local'
export default {
  data() {
    return {
      collectList: []
    }
  },
  async created() {
    getLs('collectList').then(res => {
      this.collectList = res || []
    })
  },
  methods: {
    toDetail(predAddress) {
      this.$router.push(`/detail?predAddress=${predAddress}`)
    },
    unCollect(predAddress) {
      let collectList = this.collectList || []
      collectList = collectList.filter(e => e.predAddress != predAddress)
      setLs('collectList', collectList).then(res => {
        console.log(res)
        this.collectList = res || []
      })
    },
  },
}
</script>
<style lang="less" scoped>
.collect-list {
  padding-top: 32px;
  padding-bottom: 80px;
}
.collect-item {
  cursor: default;
  width: 560px;
  margin: auto;
  padding: 35px 32px;
  box-sizing: border-box;
  border: 1px solid #E8EAEF;
  border-radius: 4px;
  margin-bottom: 24px;
  .collect-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: #1E2022;
    svg {
      cursor: pointer;
    }
  }
  .collect-desc {
    margin-top: 16px;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    color: #8796A3;
  }
}
.not {
  padding: 100px;
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  color: #8796A3;
}
</style>