<template>
  <div class="fd-select-box" @click="changeShow" v-click-outside="closeDialog">
    <p :style="{color: scoped.selected ? '#000' : '#8796A3'}">{{scoped.selected || 'Please select the token'}}</p>
    <span :class="['fd-arrow icon iconfont', { 'fd-down': scoped.showFlag }]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.25 7.5L10 13.75L3.75 7.5" stroke="#BDC6D0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span
    >
    <ul class="fd-select-list" v-show="scoped.showFlag">
      <li
        v-for="(tokenAddress, tokenName) in list"
        :key="tokenAddress"
        @click.stop="changeValue(tokenName)"
      >
        {{ tokenName }}:{{ tokenAddress }}
      </li>
      <li @click.stop="changeValue('Other')">
        Other
      </li>
    </ul>
  </div>
</template>

<script>
import derections from "@/assets/js/directions";

export default {
  name: "fdSselect",
  model: {
    prop: "selectTokenName",
    event: "changeValue",
  },
  props: {
    list: {
      required: true,
    },
    selectTokenName: String,
  },
  data() {
    return {
      scoped: {
        // 是否展示下面的列表
        showFlag: false,
        // 当前选中的
        selected: this.selectTokenName,
      },
    };
  },
  directives: { clickOutside: derections.clickOutside },
  methods: {
    // 值改变后传给父组件，因为组件定义了model，所以父组件相当于执行了绑定的model值=emit出去的值
    changeValue(item) {
      console.log(item)
      this.scoped.selected = item;
      this.scoped.showFlag = false;
      this.$emit("changeValue", this.scoped.selected);
    },
    // 改变下拉选项的显隐
    changeShow() {
      this.scoped.showFlag = !this.scoped.showFlag;
    },
    closeDialog() {
      this.scoped.showFlag = false;
    },
  },
};
</script>

<style scoped lang="less">
.fd-select-box {
  margin-top: 8px;
  position: relative;
  width: 100%;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #E8EAEF;
  border-radius: 2px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #BDC6D0;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  justify-content: space-between;
  .fd-arrow {
    transition: all 200ms;

    &.fd-down {
      transform: rotate(180deg);
    }
  }

  .fd-select-list {
    position: absolute;
    width: 100%;
    overflow: auto;
    list-style: none;
    top: 44px;
    left: 0;
    border: 1px solid #EFF0F6;
    box-shadow: 0px 4px 9px rgba(210, 212, 222, 0.2);
    border-radius: 2px;
    z-index: 9;
    padding: 8px;
    box-sizing: border-box;
    background: #FFFFFF;

    li {
      width: 100%;
      height: 44px;
      left: 0px;
      top: 0px;
      display: flex;
      align-items: center;
      padding: 0 18px;
      box-sizing: border-box;
      border-radius: 2px;
      cursor: pointer;
      color: #000;
      &:hover {
        background: #F3F4F9;
      }

      &.active {
        background: #F3F4F9;
      }
    }
  }
}
</style>