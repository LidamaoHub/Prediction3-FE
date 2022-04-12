<template>
  <div id="app">
    <nav-header></nav-header>
    <div class="all" :class="{ withShadow: badChainId }">
      <div class="container">
        <router-view />
      </div>
    </div>
    <network-shadow />
  </div>
</template>
<script>
import NavHeader from "@/components/Nav.vue";
import NetworkShadow from "@/components/Shadow";
import { mapState } from "vuex";

export default {
  components: {
    NavHeader,
    NetworkShadow,
  },
  computed: {
    ...mapState(["badChainId"]),
  },
};
</script>
<style lang="less">
#app {
  .all {
    margin-top: 20px;

    &.withShadow {
      filter: blur(7px);
    }
  }
}

.container {
  width: 565px;
  margin: 0px auto;
}

a {
  color: unset;
  &:hover,
  &:link,
  &:hover,
  &:active,
  &:visited {
    color: unset !important;
    text-decoration: none;
  }
}
</style>
