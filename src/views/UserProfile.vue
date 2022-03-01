<template>
  <div class="page-container">
    <SiteNav />
    <portal to="modals">
      <UserProfileModal
        :show="show"
        @close="closeModal"
        @update="updateProfile"
      />
    </portal>

    <section class="main">
      <section
        v-show="!isLoading"
        class="profile-container"
      >
        <div class="page-control">
          <icon
            icon-name="back-arrow"
            class="btn-back cursor-pointer"
            @click.native.stop.prevent="$router.go(-1)"
          />
          <span class="simple-info">
            <div class="user-name">{{ emptyName(user.name, user.account) }}</div>
            <div class="tweet-count">{{ user.tweetAmount | numberFormat }} 推文</div>
          </span>
        </div>
        <main class="profile">
          <div class="user-cover">
            <img
              v-show="user.cover"
              :src="user.cover"
              @error="user.cover = ''"
            >
            <div class="user-avatar">
              <div class="avatar-container">
                <img
                  v-show="user.avatar"
                  :src="user.avatar"
                  @error="user.avatar = ''"
                >
              </div>
            </div>
          </div>
          <div class="control-group">
            <template v-if="currentUser.id === user.id">
              <button
                class="btn-control-outline btn-text"
                @click.stop.prevent="showModal"
              >
                編輯個人資料
              </button>
            </template>
            <template v-else>
              <icon
                icon-name="email"
                class="btn-control-outline btn-icon  cursor-pointer"
              />
              <icon
                v-if="!user.notification"
                icon-name="notification"
                class="btn-control-outline btn-icon cursor-pointer"
                @click.native.stop.prevent="onNotification(user.id)"
              />
              <icon
                v-else
                icon-name="notification-checked"
                class="btn-control btn-icon  cursor-pointer"
                @click.native.stop.prevent="offNotification(user.id)"
              />
              <FollowControlButton
                :initial-user="user"
                class="btn-text"
                @user-followed="follow"
                @user-unfollowed="unfollow"
              />
            </template>
          </div>
          <div class="profile-group">
            <div class="user-name">
              {{ emptyName(user.name, user.account) }}
            </div>
            <div class="user-account">
              {{ user.account | addPrefix }}
            </div>
            <div class="user-introduction">
              {{ user.introduction }}
            </div>
            <div class="user-statistic">
              <router-link
                :to="{name: 'followings', params: {id: user.id}}"
                class="user-following"
              >
                {{ user.following | numberFormat }} 個<em>跟隨中</em>
              </router-link>
              <router-link
                :to="{name: 'followers', params: {id: user.id}}"
                class="user-follower"
              >
                {{ user.follower | numberFormat }} 位<em>跟隨者</em>
              </router-link>
            </div>
          </div>
        </main>
      </section>
      <UserNav />
      <router-view :user-id="$route.params.id" />
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import FollowControlButton from '@/components/FollowControlButton.vue'
import UserNav from '@/components/UserNav.vue'
import { emptyNameMethod, addPrefixFilter, numberFormatFilter } from '@/utils/mixins'
import UserProfileModal from '@/components/UserProfileModal.vue'
import { mapState } from 'vuex'
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'
import store from '@/store'

export default {
  components: {
    SiteNav,
    RecommendedList,
    FollowControlButton,
    UserProfileModal,
    UserNav
  },
  mixins: [emptyNameMethod, addPrefixFilter, numberFormatFilter],
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
        followed: false,
        tweetAmount: 0,
        notification: false
      },
      isLoading: true,
      show: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    '$store.state.currentUser': {
      handler: function (newValue, oldValue) {
        this.fetchUser(newValue.id)
      },
      deep: true
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser (userId) {
      try {
        this.isLoading = true

        const response = await usersAPI.getUserData({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.user = {
          ...this.user,
          ...response.data
        }

        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法載入使用者資料，請稍後再試'
        })
      }
    },
    // 通知開關目前僅實作狀態變化
    onNotification (userId) {
      console.log(`對 ${userId} 開啟通知`)
      this.user.notification = true
    },
    offNotification (userId) {
      console.log(`對 ${userId} 關閉通知`)
      this.user.notification = false
    },
    // 藉由FollowControlButton對上層的通知，來更新使用者的跟隨者數據
    follow () {
      this.user.follower = this.user.follower + 1
    },
    unfollow () {
      this.user.follower = this.user.follower - 1
    },
    showModal () {
      this.show = true
    },
    closeModal () {
      this.show = false
    },
    // 在使用者Profile更新成功後，強制更新Vuex的state
    updateProfile () {
      this.show = false
      store.dispatch('fetchCurrentUser')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.page-control {
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .btn-back {
    height: 24px;
    margin: 15px 40px 16px 15px;
    width: 24px;
  }

  .simple-info {
    align-self: center;

    .tweet-count {
      color: #657786;
      font-size: 13px;
      font-weight: 500;
      line-height: 13px;
    }
  }
}

.profile {
  .user-cover {
    background-color: #999999;
    height: 200px;
    position: relative;
    width: 100%;

    & > img {
      height: inherit;
      object-fit: cover;
      width: inherit;
    }
  }
  .user-avatar {
    background-color: #C4C4C4;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
    bottom: 0px;
    height: 140px;
    left: 15px;
    position: absolute;
    transform: translateY(50%);
    width: 140px;

    .avatar-container {
      clip-path: circle(66px at center);
      height: 132px;
      width: 132px;

      & > img {
        height: inherit;
        object-fit: cover;
        width: inherit;
      }
    }
  }
  .control-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 15px;
    justify-content: flex-end;
    line-height: 15px;
    margin-right: 15px;
    margin-top: 10px;

    & > * {
      margin-left: 10px;
    }

    .btn-text {
      margin-left: 10px;
      border-radius: 100px;
      padding: 9px 14px;
    }
    .btn-icon {
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }
  .profile-group {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 28px;

    .user-account {
      color: #657786;
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
    }

    .user-introduction {
      color: #000000;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      margin-top: 10px;
      word-break: break-word;
    }
    .user-statistic {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 10px;
      margin-bottom: 20px;

      .user-follower {
        margin-left: 20px;
      }

      .user-follower,
      .user-following {
        color: #000000;
        text-decoration: none;

        &:hover {
          opacity: 0.75;
        }
      }

      em {
        color: #657786;
        font-style: normal;
        font-weight: 400;
      }
    }
  }
}
.user-name {
  font-size: 19px;
  font-weight: 900;
  line-height: 24px;
}

// 分頁內容根元素的功用樣式
::v-deep .tab-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: clip;
  overflow-y: auto;
}
</style>
