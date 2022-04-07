<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container{
  width:565px;
  margin:0px auto;
}

a{
  color: unset;
  &:hover,&:link,&:hover,&:active,&:visited{
    color:unset !important;
    text-decoration: none;
  }

}



</style>
