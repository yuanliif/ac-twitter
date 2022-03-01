<template>
  <div class="tab-container">
    <!-- 推文列表 -->
    <TweetList
      :tweets="sortedTweets"
      :is-loading="isLoading"
    />
  </div>
</template>

<script>
import { Toast, sortByTime } from '@/utils/helpers'
import usersAPI from '@/apis/users'
import TweetList from '@/components/TweetList.vue'
// import moment from 'moment' // 測試用

// 測試資料
/*
const dummyTweets = [
  // 一般資料
  {
    id: 26,
    userData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // name很長
  {
    id: 27,
    userData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // name很長且account也很長
  {
    id: 28,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // 今年內
  {
    id: 29,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: '2022-02-01T11:00:00.001+0800'
  },
  // 24小時內
  {
    id: 30,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: moment().startOf('day').toISOString()
  },
  // 長內文
  {
    id: 31,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!',
    replyAmount: 12,
    likeAmount: 263,
    userLiked: true,
    createdAt: moment().startOf('day').toISOString()
  },
  // 回覆數量1,000以上，10,000以下
  {
    id: 32,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!',
    replyAmount: 5566,
    likeAmount: 263,
    userLiked: true,
    createdAt: moment().startOf('day').toISOString()
  },
  // 回覆數量10,000以上
  {
    id: 33,
    userData: {
      id: 21,
      account: 'cindy266cindy266cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    description: '今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!',
    replyAmount: 114514,
    likeAmount: 263,
    userLiked: true,
    createdAt: moment().startOf('day').toISOString()
  }
]
*/

export default {
  components: {
    TweetList
  },
  data () {
    return {
      tweets: [],
      isLoading: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchTweets(id)
    next()
  },
  computed: {
    sortedTweets () {
      return sortByTime(this.tweets, 'createdAt')
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchTweets(id)
  },
  methods: {
    // 測試用
    // fetchTweets (userId) {
    //   console.log(userId)
    //   this.tweets = dummyTweets
    //   this.isLoading = false
    // }
    async fetchTweets (userId) {
      try {
        this.isLoading = true
        const response = await usersAPI.getUserTweets({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.tweets = response.data
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試'
        })
      }
    }
  }
}
</script>
