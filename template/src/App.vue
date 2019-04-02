<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .error{
    .v-message{
      margin-left: 0px;
      background: none;
      text-indent: 0;
      color: #f60;
      font-size: 13px;
      i.icon-tishi1{
        display: inline-block;
        font-size: 18px;
        color: #60bbf9;
        vertical-align: middle;
      }
    }
    .v-s-message{
      display: none;
    }
  }
</style>
