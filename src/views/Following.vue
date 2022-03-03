<template>
  <div class="page-container">
    <SiteNav />
    <!-- 正在跟隨者區域（待完成） -->
    <section class="main">
      <FollowerAndFollowingNav
        :user="user"
        :is-loading-user="isLoadingUser"
      />
      <div class="follow-list-container">
        <FollowList
          :follow-data="proccessedData"
          :is-loading-follow-data="isLoadingFollowData"
          default-text="尚無正在跟隨"
        />
      </div>
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import FollowerAndFollowingNav from '@/components/FollowerAndFollowingNav.vue'
import FollowList from '@/components/FollowList.vue'
import followshipsAPI from './../apis/followships'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  components: {
    SiteNav,
    RecommendedList,
    FollowerAndFollowingNav,
    FollowList
  },
  data () {
    return {
      followings: [],
      user: {},
      isLoadingUser: true,
      isLoadingFollowData: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    this.fetchFollowings(id)
    next()
  },
  computed: {
    proccessedData () {
      return this.followings.map(follow => ({
        ...follow,
        id: follow.followingId
      }))
    }
  },
  watch: {
    '$store.state.messageQueue.follow': {
      handler: function (newValue, oldValue) {
        if (newValue.action === 'add') {
          return this.followUser(newValue.userId)
        }
        if (newValue.action === 'remove') {
          return this.unfollowUser(newValue.userId)
        }
      },
      deep: true
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
    this.fetchFollowings(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        this.isLoadingUser = true
        const { data } = await usersAPI.getUserData({ userId })

        if (data.id === undefined) {
          throw new Error(data.message)
        }

        this.user = data
        this.isLoadingUser = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async fetchFollowings (userId) {
      try {
        this.isLoadingFollowData = true
        const response = await followshipsAPI.getFollowings({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        if (Array.isArray(response.data) === false) {
          throw new Error(response.data.message)
        }

        this.isLoadingFollowData = false
        this.followings = response.data
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得跟隨者，請稍後再試'
        })
      }
    },
    followUser (userId) {
      this.followings = this.followings.map(user => {
        if (user.followingId === userId) {
          return {
            ...user,
            followed: true
          }
        } else {
          return user
        }
      })
    },
    unfollowUser (userId) {
      this.followings = this.followings.map(user => {
        if (user.followingId === userId) {
          return {
            ...user,
            followed: false
          }
        } else {
          return user
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-list-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: clip;
  overflow-y: auto;
}
</style>
