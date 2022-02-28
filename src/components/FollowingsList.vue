<template>
  <div>
    <div
      v-for="following in followings"
      :key="following.id"
      class="followings-list"
    >
      <div class="followings-avatar">
        <img :src="following.avatar">
      </div>
      <div class="main-info">
        <div class="name">
          {{ following.name }}
        </div>
        <div class="account">
          {{ following.account | addPrefix }}
        </div>
        <div class="tweet-content">
          {{ following.introduction }}
        </div>
      </div>
      <div class="control-button">
        <FollowControlButton :initial-user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { addPrefixFilter } from '@/utils/mixins'
import FollowControlButton from '@/components/FollowControlButton.vue'
export default {
  name: 'FollowingsList',
  components: {
    FollowControlButton
  },
  mixins: [addPrefixFilter],
  props: {
    followings: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data () {
    return {
      user: {
        id: -1,
        account: '',
        name: '',
        cover: '',
        avatar: '',
        introduction: '',
        follower: 0,
        following: 0,
        followed: true,
        tweetAmount: 0,
        notification: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.followings-list {
  display: flex;
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 10px;
  position: relative;
  .followings-avatar {
    margin-top: 13px;
    margin-left: 15px;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .main-info {
    margin-left: 10px;
    margin-top: 10px;
    .name {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      color: #1c1c1c;
    }

    .account {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      color: #657786;
    }

    .tweet-content {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
    }
  }

  .control-button {
    position: absolute;
    right: 0px;
    top: 10px;
    .btn-control {
      width: 90px;
      height: 25px;
    }

    .btn-control-outline {
      width: 60px;
      height: 25px;
      padding: 0;
    }
  }
}
</style>
