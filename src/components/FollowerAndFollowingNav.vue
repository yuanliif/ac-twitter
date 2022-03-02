<template>
  <div
    v-if="!isLoadingUser"
    class="followers"
  >
    <div class="followers-header">
      <icon
        class="back-button cursor-pointer"
        icon-name="back-arrow"
        @click.native.stop.prevent="$router.go(-1)"
      />
      <div
        class="user-info"
      >
        <div class="user-name">
          {{ emptyName(user.name, user.account) }}
        </div>
        <div class="tweets-amount">
          {{ user.tweetAmount }} 推文
        </div>
      </div>
    </div>
    <div
      class="switch-list"
    >
      <router-link
        :to="{name: 'followers', params: {id: user.id}}"
        class="followers"
      >
        跟隨者
      </router-link>

      <router-link
        :to="{name: 'followings', params: {id: user.id}}"
        class="followings"
      >
        正在跟隨
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyNameMethod } from '@/utils/mixins'

export default {
  name: 'FollowerAndFollowingNav',
  mixins: [emptyNameMethod],
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {}
    },
    isLoadingUser: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.followers-header {
  display: flex;
  padding: 16px 15px 0px 15px;

  .back-button {
    height: 24px;
    width: 24px;
    margin: auto 0;
    color: #000000;
  }

  .user-info {
    margin-left: 40px;
    .user-name {
      font-style: normal;
      font-weight: 900;
      font-size: 19px;
      line-height: 28px;
      color: #1c1c1c;
    }

    .tweets-amount {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 19px;
      color: #657786;
    }
  }
}

.switch-list {
  display: flex;
  height: 54px;
  border-bottom: 1px solid #e6ecf0;

  & > * {
    width: 130px;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    color: #657786;
    text-align: center;
    padding: 15px;

    &:hover {
      text-decoration: none;
      opacity: 0.75;
    }
    &.active {
      color: #ff6600;
      border-bottom: 2px solid #ff6600;
    }
  }
}
</style>
