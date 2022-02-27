<template>
  <div class="nav-group">
    <router-link
      class="nav-link"
      :to="{name: 'user-tweets', params: {id: $route.params.id}}"
    >
      推文
    </router-link>
    <router-link
      class="nav-link"
      :to="{name: 'user-replies', params: {id: $route.params.id}}"
    >
      推文與回覆
    </router-link>
    <router-link
      class="nav-link"
      :to="{name: 'user-likes', params: {id: $route.params.id}}"
    >
      喜歡的內容
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.nav-group {
  align-items: center;
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  height: 52px;
  flex-direction: row;
  flex-wrap: nowrap;

  .nav-link {
    color: #657786;
    font-size: 15px;
    font-weight: bold;
    line-height: 22px;
    padding-bottom: 15px;
    padding-top: 15px;
    text-align: center;
    width: 130px;

    &:hover {
      opacity: 0.75;
    }

    &.active {
      border-bottom: 2px solid #FF6600;
      color: #FF6600;
      padding-bottom: 13px;
    }
  }
}
</style>
