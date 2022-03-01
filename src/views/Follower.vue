<template>
  <div class="page-container">
    <SiteNav />
    <!-- 跟隨者區域（待完成） -->
    <section class="main">
      <FollowerAndFollowingNav :users="users" />
      <div class="container">
        <FollowersList :followers="followers" />
      </div>
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import FollowerAndFollowingNav from '@/components/FollowerAndFollowingNav.vue'
import FollowersList from '@/components/FollowersList.vue'
import followshipsAPI from './../apis/followships'
import usersAPI from './../apis/users'
import { Toast } from '../utils/helpers'

export default {
  components: {
    SiteNav,
    RecommendedList,
    FollowerAndFollowingNav,
    FollowersList
  },
  data () {
    return {
      followers: [],
      users: {}
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchUser(id)
    this.fetchFollowers(id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        const response = await usersAPI.getUserData({ userId })
        console.log('fetchUser', response)

        if (response.status === 'error') {
          throw new Error(response.statusText)
        }

        this.users = response.data
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得該使用者資訊，請稍後再試'
        })
      }
    },
    async fetchFollowers (userId) {
      try {
        const response = await followshipsAPI.getFollowers({ userId })
        console.log('fetchFollowers', response)

        if (response.status === 'error') {
          throw new Error(response.statusText)
        }

        this.followers = response.data
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得跟隨者，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section.main {
  width: 600px;
  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
    overflow-x: clip;
    overflow-y: auto;
  }
}
</style>>
