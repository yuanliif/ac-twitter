<template>
  <div v-show="!isLoadingFollowData">
    <div v-if="followData.length > 0">
      <div
        v-for="follow in followData"
        :key="follow.id"
        class="follow-group"
      >
        <UserThumbnail
          :initial-user="follow"
          class="follow-avatar"
        />
        <div class="main-info">
          <div class="user-container">
            <span class="info">
              <div
                class="name"
                :title="emptyName(follow.name, follow.account)"
              >
                {{ emptyName(follow.name, follow.account) }}
              </div>
              <div
                class="account"
                :title="follow.account"
              >
                {{ follow.account | addPrefix }}
              </div>
            </span>
            <span
              v-show="follow.showControl"
              class="control"
            >
              <FollowControlButton :initial-user="follow" />
            </span>
          </div>
          <div class="introduction">
            {{ follow.introduction }}
          </div>
        </div>
      </div>
    </div>
    <h1
      v-else
      class="default-text"
    >
      {{ defaultText }}
    </h1>
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
    },
    defaultText: {
      type: String,
      required: true,
      default: ''
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
    flex-shrink: 0;
    margin-top: 3px;
    margin-right: 10px;
  }

  .main-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-wrap: nowrap;
    overflow: hidden;

    .user-container {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      flex-wrap: nowrap;
    }

    .info {
      flex-grow: 1;
      overflow: hidden;
      white-space: nowrap;
    }

    .name {
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 15px;
      color: #1c1c1c;
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
    }

    .account {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: #657786;
      margin-top: 5px;
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
    }

    .introduction {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .control {
    flex-shrink: 0;
    font-size: 15px;
    font-weight: bold;
    height: 25px;
    line-height: 15px;
    margin-left: 5px;

    .btn-control {
      padding: 5px 15px;
    }
    .btn-control-outline {
      padding: 5px 15px;
    }
  }
}

h1.default-text {
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>
