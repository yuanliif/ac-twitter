<template>
  <div class="tweets">
    <div class="navbar">
      <div class="title">
        推文清單
      </div>
    </div>
    <div class="data-panel">
      <div
        v-for="tweet in tweets"
        :key="tweet.id"
        class="list-container d-flex"
      >
        <span class="photo">
          <UserThumbnail :initial-user="tweet.userData" />
        </span>
        <div class="text-area">
          <div class="info d-flex">
            <div class="name">
              {{ tweet.userData.name }}
            </div>
            <div class="account">
              {{ tweet.userData.account | addIcon }} ‧
              {{ tweet.createAt }}
            </div>
          </div>
          <div class="comment">
            <span> {{ tweet.description | sliceSentence }} </span>
          </div>
          <button
            class="btn delete"
            type="button"
            :disabled="isProcessing"
            @click.prevent.stop="deleteTweet(tweet.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from './../utils/helpers'
import adminApi from './../apis/admin'
import UserThumbnail from './UserThumbnail.vue'

export default {
  components: {
    UserThumbnail
  },
  filters: {
    addIcon (account) {
      return '@' + account
    },
    sliceSentence (comment) {
      return comment.length > 50 ? comment.slice(0, 50) + '...' : comment
    }
  },
  data () {
    return {
      tweets: [],
      isProcessing: false
    }
  },
  created () {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await adminApi.getTweets()
        this.tweets = {
          ...data
        }
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得資料'
        })
        console.dir(error)
      }
    },
    async deleteTweet (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await adminApi.deleteTweet({ tweetId })
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法刪除篇推文'
        })
        console.dir(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  pointer-events: none;
}
.tweets {
  min-width: 70vmax;
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
  .data-panel {
    height: 1147px;
    overflow-y: auto;
    .list-container {
      position: relative;
      height: 65px;
      padding: 0 0 12px 15px;
      margin-top: 10px;
      border-bottom: 1px solid #e6ecf0;
      .text-area {
        line-height: 22px;
        font-size: 15px;
        margin-left: 15px;
        .name {
          margin-right: 5px;
          a {
            color: #1c1c1c;
          }
        }
        .account {
          color: #657786;
          font-weight: 500;
        }
        .comment {
          font-weight: 500;
          margin-top: 6px;
        }
      }
      .delete {
        background: url('./../assets/images/Delete_@2x.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        border: none;
        padding: 0;
        right: 19.5px;
        top: 4.5px;
        height: 17px;
        width: 17px;
        &:focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
