<template>
  <div
    v-show="!isLoading"
    class="tweet-list"
  >
    <template v-show="tweets.length > 0">
      <router-link
        v-for="tweet in tweets"
        :key="tweet.id"
        v-slot="{ navigate }"
        :to="{name: 'tweet', params: {id: tweet.id}}"
        class="tweet-container cursor-pointer"
        custom
      >
        <div @click="navigate">
          <section class="avatar-part">
            <UserThumbnail :initial-user="tweet.userData" />
          </section>
          <section class="content-part">
            <div class="title-part">
              <div
                class="user-name"
                :title="emptyName(tweet.userData.name, tweet.userData.account)"
              >
                {{ emptyName(tweet.userData.name, tweet.userData.account) }}
              </div>
              <div class="account-and-time">
                {{ tweet.userData.account | addPrefix }}・{{ tweet.createAt | timeFormat }}
              </div>
            </div>
            <div class="tweet">
              {{ tweet.description }}
            </div>
            <div class="control-group">
              <div class="control-container">
                <span class="event-area">
                  <icon
                    icon-name="reply"
                    class="control-icon"
                  />
                  <span class="control-statistic">{{ tweet.replyAmount | numberFormat }}</span>
                </span>
              </div>
              <div class="control-container">
                <span class="event-area">
                  <icon
                    icon-name="like"
                    class="control-icon"
                  />
                  <span class="control-statistic">{{ tweet.likeAmount | numberFormat }}</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </router-link>
    </template>
    <h1
      v-show="tweets.length === 0"
      class="default-text"
    >
      尚無推文
    </h1>
  </div>
</template>

<script>
import UserThumbnail from '@/components/UserThumbnail.vue'
import { emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter } from '@/utils/mixins'
import { sortByTime, Toast } from '@/utils/helpers'
import UsersAPI from '@/apis/users'
// import moment from 'moment'

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
    UserThumbnail
  },
  mixins: [emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter],
  props: {
    userId: {
      type: Number,
      required: true,
      default: -1
    }
  },
  data () {
    return {
      tweets: [],
      isLoading: true
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchTweets(id)
  },
  methods: {
    // fetchTweets (userId) {
    //   this.tweets = sortByTime(dummyTweets, 'createAt')
    //   this.isLoading = false
    // }
    async fetchTweets (userId) {
      try {
        this.isLoading = true
        const response = await UsersAPI.getUserTweets({ userId })

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
.tweet-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-wrap: nowrap;

  .tweet-container {
    border-bottom: 1px solid #E6ECF0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 15px;
  }

  section.avatar-part {
    margin-right: 10px;
    margin-top: 3px;
  }

  section.content-part {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: hidden;

    .title-part {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      font-size: 15px;
      line-height: 22px;

      .user-name {
        color: #1C1C1C;
        flex-shrink: 1;
        font-weight: bold;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .account-and-time {
        color: #657786;
        flex-shrink: 0;
        font-weight: 500;
      }
    }

    .tweet {
      margin-top: 6px;
      word-break: break-all;
    }

    .control-group {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-top: 13px;

      .control-container {
        color: #657786;
        width: 90px;

        .event-area {
          cursor: pointer;
        }

        .control-icon {
          height: 15px;
          margin-right: 10px;
          width: 15px;
        }

        .control-statistic {
          font-size: 13px;
          font-weight: 500;
          line-height: 13px;
        }
      }
    }
  }
  h1.default-text {
    font-weight: bold;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
