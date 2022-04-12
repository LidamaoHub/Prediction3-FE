<template>
  <div class="pred-list">
      <div class="container">
    <a-list size="default" bordered :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>{{ item }}</a-list-item>
      </template>
      <template #header>
        <div>Header</div>
      </template>
      <template #footer>
        <div>Footer</div>
      </template>
    </a-list>
      </div>
  </div>
</template>
<script>
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default {
  data() {
    return {
      data: data,
    };
  },
  async mounted(){
      let self = this 

  }
};
</script>
<style lang="less">
    .pred-list{

    }
</style>
