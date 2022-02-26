<template>
  <div class="users">
    <div class="navbar">
      <div class="title">
        推文清單
      </div>
    </div>
    <div class="data-panel">
      <div class="users-container">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-card d-flex flex-column flex-wrap align-items-center justify-content-between"
        >
          <img
            :src="user.cover"
            alt=""
            class="cover"
          >
          <div class="info">
            <div class="avatar">
              <UserThumbnail
                :initial-user="user"
                style="
                  width: 100px;
                  height: 100px;
                  clip-path: circle(50px at center);
                "
              />
            </div>
            <div class="name">
              {{ user.name }}
            </div>
            <div class="account">
              {{ user.account }}
            </div>
          </div>
          <div class="tweet">
            <div class="comment-like d-flex mx-auto justify-content-between">
              <div class="comment d-flex">
                <icon
                  class="nav-icon"
                  icon-name="tweets"
                  icon-class="tweets"
                />
                <p>
                  {{ user.tweetAmount | adjustNum }}
                </p>
              </div>
              <div class="like d-flex">
                <icon
                  class="nav-icon"
                  icon-name="like"
                  icon-class="like"
                />
                <p>
                  {{ user.likeAmount | adjustNum }}
                </p>
              </div>
            </div>
            <div class="follow d-flex">
              <div class="following">
                {{ user.following }}個跟隨中
              </div>
              <div class="follower">
                {{ user.follower }}個跟隨者
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserThumbnail from './UserThumbnail.vue'
import adminApi from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    UserThumbnail
  },
  filters: {
    adjustNum (num) {
      if (num < 1000) {
        return num
      } else if (num < 10000) {
        return Math.floor(((num / 1000) * 10) / 10).toFixed(1) + 'K'
      } else {
        return Math.floor(num / 1000) + 'K'
      }
    }
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminApi.getUsers()
        this.users = data
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法顯示所有使用者'
        })
        console.dir(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  width: 20px;
  height: 20px;
}
a {
  pointer-events: none;
}
c .users {
  min-width: 70vmax;
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
  .users-container {
    padding: 0px 15px;
    .user-card {
      position: relative;
      width: 245px;
      height: 314px;
      background: #f6f7f8;
      border-radius: 10px;
      margin: 0 15px 15px 0;
      .cover {
        width: 245px;
        height: 140px;
      }
      .info {
        position: absolute;
        text-align: center;
        top: 68px;
        left: 72.5px;
        font-size: 15px;
        line-height: 22px;
        .avatar {
          width: 100px;
          height: 100px;
        }
        .name {
          margin-top: 5px;
          font-weight: 900;
        }
        .account {
          margin-top: 2px;
          color: #657786;
          font-weight: 500;
        }
      }
      .tweet {
        margin-bottom: 21px;
        .comment-like {
          margin: 15px 0;
          width: 130px;
          height: 24px;
          p {
            line-height: 15px;
            margin-left: 7px;
          }
          .comment {
            margin-right: 15px;
          }
        }
      }
      .follow {
        font-size: 14px;
        line-height: 20px;
        color: #000;
        .following {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
