<template>
  <div class="box">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style lang="less" scoped>
.box{
  height: 200px;
  background-color: skyblue;
}
.left{
  float:left;
  width:100px;
  height:200px;
}
.right{
  margin-left:100px;
  height:200px;
  background:yellowgreen;
}
</style>