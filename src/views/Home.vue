<template>
  <div class="home">
    <detail/>
  </div>
</template>

<script>
// @ is an alias to /src
import Detail from "./Detail/detail.vue"
export default {
  name: 'Home',
  components: {
      Detail
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

