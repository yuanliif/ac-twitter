<template>
  <div class="home-tweet-area">
    <PageHeader>
      首頁
    </PageHeader>
    <section
      class="tweet-input-box"
    >
      <section class="avatar-part">
        <UserThumbnail :initial-user="currentUser" />
      </section>
      <section class="input-part">
        <textarea
          placeholder="有什麼新鮮事？"
          maxlength="140"
        />
        <button class="btn-control btn-tweet">
          推文
        </button>
      </section>
    </section>
    <section class="tweet-list-container">
      <TweetList
        :tweets="tweets"
        :is-loading="isLoading"
      />
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TweetList from '@/components/TweetList.vue'
import UserThumbnail from '@/components/UserThumbnail.vue'
import tweetsAPI from '@/apis/tweets'
import { sortByTime, Toast } from '@/utils/helpers'
// import moment from 'moment' // 測試用
import { mapState } from 'vuex'

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
    createAt: '2016-08-29T09:12:33.001+0000'
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
    createAt: '2016-08-29T09:12:33.001+0000'
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
    createAt: '2016-08-29T09:12:33.001+0000'
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
    createAt: '2022-02-01T11:00:00.001+0800'
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
    createAt: moment().startOf('day').toISOString()
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
    createAt: moment().startOf('day').toISOString()
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
    createAt: moment().startOf('day').toISOString()
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
    createAt: moment().startOf('day').toISOString()
  }
]
*/

export default {
  components: {
    PageHeader,
    UserThumbnail,
    TweetList
  },
  data () {
    return {
      tweets: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    // 測試用
    // fetchTweets () {
    //   this.tweets = sortByTime(dummyTweets, 'createAt')
    //   this.isLoading = false
    // }
    async fetchTweets () {
      try {
        this.isLoading = true
        const response = await tweetsAPI.get()

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.tweets = sortByTime(response.data)
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

<style lang="scss" scoped>
.home-tweet-area {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
}
section.tweet-input-box {
  border-bottom: 10px solid #E6ECF0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 15px;

  .input-part {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-wrap: nowrap;
    margin-left: 10px;

    textarea {
      border: none;
      height: 26px;
      font-size: 18px;
      font-weight: 500;
      line-height: 26px;
      margin-top: 11px;
      padding: 0;
      resize: none;

      &::placeholder {
        color: #9197A3;
      }

      &:focus {
        border: none;
        outline: none;
      }
    }

    .btn-tweet {
      align-self: flex-end;
      border-radius: 100px;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 25px;
      padding: 10px 15px;
    }
  }
}
.tweet-list-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: clip;
  overflow-y: auto;
}
</style>
