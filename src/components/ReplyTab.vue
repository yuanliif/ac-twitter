<template>
  <div class="tab-container">
    <!-- 推文與回覆列表 -->
    <div
      v-show="!isLoading"
      class="reply-list"
    >
      <!-- 推文顯示清單 -->
      <template v-show="replies.length > 0">
        <Reply
          v-for="reply in replies"
          :key="reply.id"
          :initial-reply="reply"
        />
      </template>
      <h1
        v-show="isLoading === false && replies.length === 0"
        class="default-text"
      >
        尚無推文與回覆
      </h1>
    </div>
  </div>
</template>

<script>
import { sortByTime, Toast } from '@/utils/helpers'
import Reply from '@/components/Reply.vue'
import usersAPI from '@/apis/users'
// import moment from 'moment' // 測試用

// 測試資料
/*
const dummyReplies = [
  // 一般資料
  {
    id: 26,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561',
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // name很長
  {
    id: 27,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561Danny561Danny561Danny561Da',
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // name很長且account也很長
  {
    id: 28,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266cindy266cindy266cind',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561Danny561Danny561Danny561Da',
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // 今年內
  {
    id: 29,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266cindy266cindy266cind',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561Danny561Danny561Danny561Da',
    createdAt: '2022-02-01T11:00:00.001+0800'
  },
  // 24小時內
  {
    id: 30,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266cindy266cindy266cind',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561Danny561Danny561Danny561Da',
    createdAt: moment().startOf('day').toISOString()
  },
  // 長內文
  {
    id: 31,
    comment: '今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!今天天氣好好喔!!',
    replyerData: {
      id: 21,
      account: 'cindy266cindy266cindy266cind',
      name: '鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561Danny561Danny561Danny561Da',
    createdAt: moment().startOf('day').toISOString()
  },
  // 一般資料
  {
    id: 32,
    comment: '今天天氣好冷唷aaaaaa',
    replyerData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561',
    createdAt: '2016-08-29T09:12:33.001+0000'
  },
  // 一般資料
  {
    id: 23,
    comment: '今天天氣好冷唷',
    replyerData: {
      id: 21,
      account: 'cindy266',
      name: '鰻魚燒',
      avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
    },
    tweetId: 29,
    tweetOwnerId: 65,
    tweetOwnerAccount: 'Danny561',
    createdAt: '2016-05-29T09:12:33.001+0000'
  }
]
*/

export default {
  components: {
    Reply
  },
  data () {
    return {
      replies: [],
      isLoading: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchTweets(id)
    next()
  },
  created () {
    const { id } = this.$route.params
    this.fetchReplies(id)
  },
  methods: {
    // 測試用
    /*
    fetchReplies (userId) {
      console.log(userId)
      this.replies = sortByTime(dummyReplies, 'createdAt')
      this.isLoading = false
    }
    */
    async fetchReplies (userId) {
      try {
        this.isLoading = true
        const response = await usersAPI.getUserReplies({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.replies = sortByTime(response.data)
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文與回覆，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;

  h1.default-text {
    font-weight: bold;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
