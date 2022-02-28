<template>
  <div class="followers">
    <div class="followers-header">
      <router-link
        class="back-button cursor-pointer"
        to="/user/:id"
      >
        &larr;
      </router-link>
      <div class="user-info">
        <div class="user-name">
          {{ users.name }}
        </div>
        <div class="tweets-amount">
          {{ users.tweetAmount }} 推文
        </div>
      </div>
    </div>
    <div class="switch-list">
      <router-link
        to="/user/:id/followers"
        class="followers"
      >
        跟隨者
      </router-link>

      <router-link
        to="/user/:id/followings"
        class="followings"
      >
        正在跟隨
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowerAndFollowingNav',
  props: {
    users: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.followers-header {
  display: flex;
  padding-left: 19px;
  padding-top: 7px;

  .back-button {
    margin: auto 0;
    color: #000000;
  }

  .user-info {
    margin-left: 43px;
    .user-name {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 900;
      font-size: 19px;
      color: #1c1c1c;
    }

    .tweets-amount {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      color: #657786;
    }
  }
}

.switch-list {
  display: flex;
  height: 52px;
  border-bottom: 1px solid #e6ecf0;
  .followers {
    width: 130px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    color: #657786;
    text-align: center;
    padding: 15px;
    &:hover {
      text-decoration: none;
    }
    &.active {
      color: #ff6600;
      border-bottom: 2px solid #ff6600;
    }
  }

  .followings {
    width: 130px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    color: #657786;
    text-align: center;
    padding: 15px;
    &:hover {
      text-decoration: none;
    }
    &.active {
      color: #ff6600;
      border-bottom: 2px solid #ff6600;
    }
  }
}
</style>
