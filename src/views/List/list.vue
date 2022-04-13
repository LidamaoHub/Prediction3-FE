<template>
  <div class="pred-list">
    <div class="list-card">
      <div class="list-tags">
        <div class="tag active">Latest</div>
      </div>
      <div class="list-items">
        <div class="line" v-for="(line, key) in lines" :key="`pred-${key}`">
          <div class="line-title">BigTitle Big Title</div>
          <div class="line-body">
            <div class="popular sub"><div>content</div></div>
            <div class="remaining sub">23:20</div>
            <div class="liquidity sub">1000,000 LDM</div>
          </div>
        </div>
        <div class="line-empty" v-if="lines.length == 0">
          <span>Empty</span>  &nbsp;<span>😅</span>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lines: [],
    };
  },
  async mounted() {
    let self = this;
  },
};
</script>
<style lang="less">
.pred-list {
  color: black;
  .list-card {
    .list-tags {
      display: flex;
      margin-bottom: 20px;;
      .tag {
        &.active {
          background-color: #19202e;
          color: white;
        }
        padding: 0px 10px;
        height: 25px;
        line-height: 25px;
      }
    }
    .list-items {
      .line-empty{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:16px;
        border:1px dashed black;
        border-radius: 5px;
        color:#9CABBB;
        height: 150px;
      }
      .line {
        
        padding: 15px 0px;
        transition: padding 0.5s ease-out;
        cursor: pointer;
        &:hover {
          background-color: black;
          color: white;
          padding:15px 20px;
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
