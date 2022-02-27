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

#app {
  height: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 1440px;
}

// 作為View Template根元素使用樣式
.page-container {
  color: #1C1C1C;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-family: 'Noto Sans TC', serif;
  height: inherit;
  width: inherit;
}

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

// section.main通用設定
section.main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 600px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
