<template>
  <div class="page-container">
    <SiteNav />
    <section class="main">
      <section
        class="tweet-and-reply"
      >
        <div class="page-control">
          <icon
            icon-name="back-arrow"
            class="btn-back cursor-pointer"
            @click.native.stop.prevent="$router.go(-1)"
          />
          <span class="page-header">
            推文
          </span>
        </div>
        <main
          v-show="!isLoadingTweet"
          class="tweet"
        >
          <div class="user-info">
            <UserThumbnail :initial-user="tweet.userData" />
            <span class="user">
              <div class="name">{{ emptyName(tweet.userData.name, tweet.userData.account) }}</div>
              <div class="account">{{ tweet.userData.account | addPrefix }}</div>
            </span>
          </div>
          <div class="description">
            {{ tweet.description }}
          </div>
          <div class="time">
            {{ tweet.createdAt | timeFormatForTweetPage }}
          </div>
          <div class="breaker" />
          <div class="statistic">
            <span class="reply">
              <span class="count">
                {{ tweet.replyAmount | numberFormatEng }}
              </span>
              <span class="text">
                回覆
              </span>
            </span>
            <span class="like">
              <span class="count">
                {{ tweet.likeAmount | numberFormatEng }}
              </span>
              <span class="text">
                喜歡次數
              </span>
            </span>
          </div>
          <div class="breaker" />
          <div class="control-group">
            <icon
              class="control btn-reply cursor-pointer"
              icon-name="reply"
            />
            <icon
              v-if="tweet.userLiked"
              class="control btn-like cursor-pointer"
              icon-name="like-checked"
              @click.native.stop.prevent="unlike(tweet.id)"
            />
            <icon
              v-else
              class="control btn-like cursor-pointer"
              icon-name="like"
              @click.native.stop.prevent="like(tweet.id)"
            />
          </div>
        </main>
        <section class="reply-section">
          <div class="reply-list">
            <Reply
              v-for="reply in replies"
              :key="reply.id"
              :initial-reply="reply"
            />
          </div>
        </section>
      </section>
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import UserThumbnail from '@/components/UserThumbnail.vue'
import Reply from '@/components/Reply.vue'
import { sortByTime, Toast } from '@/utils/helpers'
import { emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter } from '@/utils/mixins'
import tweetsAPI from '@/apis/tweets'

export default {
  components: {
    SiteNav,
    RecommendedList,
    Reply,
    UserThumbnail
  },
  mixins: [emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter],
  data () {
    return {
      tweet: {
        id: -1,
        userData: {
          id: -1,
          account: '',
          name: '',
          avatar: ''
        },
        description: '',
        replyAmount: 0,
        likeAmount: 0,
        userLiked: false,
        createdAt: '2016-08-29T09:12:33.001+0000'
      },
      replies: [],
      isLoadingTweet: true,
      isLOadingReplies: true,
      isProcessing: false
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchTweet(id)
    this.fetchReplies(id)
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchTweet(id)
    this.fetchReplies(id)
    next()
  },
  methods: {
    async fetchTweet (tweetId) {
      this.isLoadingTweet = true
      try {
        const response = await tweetsAPI.get({ tweetId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        const { data } = response
        this.tweet = {
          ...this.tweet,
          ...data
        }

        this.isLoadingTweet = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試'
        })
      }
    },
    async fetchReplies (tweetId) {
      this.isLOadingReplies = true
      try {
        const response = await tweetsAPI.getReplies({ tweetId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.replies = sortByTime(response.data, 'createdAt')

        this.isLoadingTweet = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆資料，請稍後再試'
        })
      }
    },
    async like (tweetId) {
      if (this.isProcessing) {
        Toast.fire({
          icon: 'warning',
          title: '請稍後再試'
        })
        return
      }
      this.isProcessing = true

      try {
        const { data } = await tweetsAPI.like({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.tweet.userLiked = true
        this.tweet.likeAmount += 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法like推文，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    },
    async unlike (tweetId) {
      if (this.isProcessing) {
        Toast.fire({
          icon: 'warning',
          title: '請稍後再試'
        })
        return
      }
      this.isProcessing = true

      try {
        const { data } = await tweetsAPI.unlike({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.tweet.userLiked = false
        this.tweet.likeAmount -= 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法unlike推文，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section.tweet-and-reply {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: nowrap;
  overflow: hidden;
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

  .page-header {
    align-self: center;
    color: #1C1C1C;
    font-size: 18px;
    font-weight: bold;
    line-height: 26px;
  }
}

main.tweet {
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-wrap: nowrap;
  padding: 15px;

  .breaker {
    background-color: #E6ECF0;
    height: 1px;
  }

  .user-info {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .user {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-wrap: nowrap;
      justify-content: center;
      margin-left: 10px;
      overflow: hidden;
      white-space: nowrap;

      .name {
        color: #1C1C1C;
        font-size: 15px;
        font-weight: bold;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .account {
        color: #657786;
        font-size: 15px;
        font-weight: 500;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .description {
    color: #1C1C1C;
    font-size: 23px;
    font-weight: 500;
    line-height: 34px;
    margin-top: 15px;
    word-break: break-all;
  }

  .time {
    color: #657786;
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .statistic {
    font-size: 19px;
    line-height: 28px;
    padding-bottom: 20px;
    padding-top: 20px;

    .reply {
      margin-left: 4px;
    }
    .like {

      margin-left: 20px;
    }
    .count {
      color: #000000;
      font-weight: bold;
    }
    .text {
      color: #657786;
      font-weight: 500;
    }
  }
  .control-group {
    margin-top: 18px;

    .control {
      color: #657786;
      height: 30px;
      width: 30px;
    }
    .btn-like {
      margin-left: 150px;
    }
  }
}

section.reply-section {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: clip;
  overflow-y: auto;

  // 強制修改下層的Reply Component樣式
  ::v-deep .reply-to {
    margin-top: 4px;
  }
  ::v-deep .reply {
    font-weight: normal;
    margin-top: 5px;
  }
}
</style>
