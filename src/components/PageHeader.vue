<template>
  <div class="page-header">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-header {
  border-bottom: 1px solid #E6ECF0;
  color: #1C1C1C;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 18px;
  font-weight: bold;
  line-height: 26px;
  padding: 14px 15px;
}
</style>
