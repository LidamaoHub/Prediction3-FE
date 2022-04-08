<template>
  <div class="home">
    <nav-header></nav-header>
    <detail/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavHeader from "@/components/Nav.vue";
import Detail from "./Detail/detail.vue"
export default {
  name: 'Home',
  components: {
      NavHeader,Detail
  },
  mounted(){
  }
  
}
</script>
<style lang="less">
  .home{
    min-height: 100vh;
  }
</style>

