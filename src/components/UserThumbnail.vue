<!--
名稱：泛用型使用者頭像縮圖
用法：使用時傳入使用者資訊（至少須含id和avatar）
功能：
  1. 頭像載入成功，顯示頭像
  2. 頭像載入失敗，顯示預設樣式
  3. 點擊頭像跳頁至使用者Profile頁
-->

<template>
  <router-link
    class="photo-container"
    :to="{name: 'user-tweets', params: {id : user.userData.id}}"
  >
    <img
      v-show="user.avatar !== ''"
      :src="user.avatar"
      @error="user.avatar = ''"
    >
  </router-link>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: {
        id: -1,
        avatar: ''
      }
    }
  },
  created () {
    // *解構復值把avatar拿出
    const { avatar } = this.initialUser.userData
    this.user = {
      ...this.user,
      ...this.initialUser,
      avatar
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  background-color: #C4C4C4;
  clip-path: circle(25px at center);
  display: block;
  height: 50px;
  width: 50px;

  > img {
    height: inherit;
    object-fit: cover;
    width: inherit;
  }
}
</style>
