<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap');

// 通用按鈕顏色樣式
.btn-control {
  background-color: #FF6600;
  border: none;
  color: #FFFFFF;

  &:hover {
    background-color: #b14700;
  }

  &[disabled] {
    opacity: 0.4;
  }
}
.btn-control-outline {
  background-color: transparent;
  border: 1px solid #FF6600;
  color: #FF6600;

  &:hover {
    background-color: #FF6600;
    color: #FFFFFF
  }
}
</style>
