<template>
  <div>
    <div
      v-for="follow in followData"
      v-show="!isLoadingFollowData"
      :key="follow.id"
      class="follow-group"
    >
      <UserThumbnail
        :initial-user="follow"
        class="follow-avatar"
      />
      <div class="main-info">
        <div class="name">
          {{ emptyName(follow.name, follow.account) }}
        </div>
        <div class="account">
          {{ follow.account | addPrefix }}
        </div>
        <div class="introduction">
          {{ follow.introduction }}
        </div>
      </div>
      <div class="control-button">
        <FollowControlButton :initial-user="follow" />
      </div>
    </div>
  </div>
</template>

<script>
import { addPrefixFilter, emptyNameMethod } from '@/utils/mixins'
import FollowControlButton from '@/components/FollowControlButton.vue'
import UserThumbnail from '@/components/UserThumbnail.vue'

export default {
  components: {
    UserThumbnail,
    FollowControlButton
  },
  mixins: [addPrefixFilter, emptyNameMethod],
  props: {
    followData: {
      type: Array,
      required: true,
      default: () => []
    },
    isLoadingFollowData: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-group {
  display: flex;
  border-bottom: 1px solid #e6ecf0;
  padding: 10px 15px;
  position: relative;

  .follow-avatar {
    margin-top: 3px;
    margin-right: 10px;
  }

  .main-info {
    .name {
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 15px;
      color: #1c1c1c;
    }

    .account {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: #657786;
      margin-top: 5px;
    }

    .introduction {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
    }
  }

  .control-button {
    font-size: 15px;
    font-weight: bold;
    line-height: 15px;
    position: absolute;
    right: 15px;
    top: 15px;

    .btn-control {
      padding: 5px 15px;
    }
    .btn-control-outline {
      padding: 5px 15px;
    }
  }
}
</style>
