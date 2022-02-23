<template>
  <div class="tweets">
    <div class="navbar">
      <div class="title">
        推文清單
      </div>
    </div>
    <div class="list-container d-flex">
      <span class="photo">
        <UserThumbnail :initial-user="user" />
      </span>
      <div class="text-area">
        <div class="info d-flex">
          <div class="name">
            Apple
          </div>
          <div class="account">
            @apple ‧ 3小時
          </div>
        </div>
        <div class="comment">
          <span> sfwuaehflirhgawenful </span>
        </div>
      </div>
      <div class="delete">
        <img
          src="./../assets/images/Delete_@2x.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import UserThumbnail from './UserThumbnail.vue'
export default {
  components: {
    UserThumbnail
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  min-width: 1062px;
  border-left: 1px solid #e6ecf0;
  .navbar {
    height: 55px;
    width: 100%;
    padding: 15px 0px 15px 26px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e6ecf0;
    .title {
      font-size: 18px;
      line-height: 26px;
    }
  }
  .list-container {
    position: relative;
    height: 65px;
    padding: 0 0 15px 15px;
    margin-top: 10px;
    border-bottom: 1px solid #E6ECF0;
    .text-area {
      line-height: 22px;
      font-size: 15px;
      margin-left: 15px;
      .name {
        margin-right: 5px;
      }
      .account {
        color: #657786;
        font-weight: 500;
      }
      .comment {
        font-weight: 500;
        margin-top: 6px;
      }
    }
    .delete {
      position: absolute;
      top: 19.5px;
      right: 19.5px;
    }
    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
}
</style>
