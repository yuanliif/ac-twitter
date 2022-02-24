<template>
  <div class="tweets">
    <div class="navbar">
      <div class="title">
        推文清單
      </div>
    </div>
    <div
      v-for="user in users"
      :key="user.id"
      class="list-container d-flex"
    >
      <span class="photo">
        <UserThumbnail :initial-user="user" />
      </span>
      <div class="text-area">
        <div class="info d-flex">
          <div class="name">
            <router-link
              :to="{ name: 'user-tweets', params: { id: user.userData.id } }"
            >
              {{ user.userData.name }}
            </router-link>
          </div>
          <div class="account">
            {{ user.userData.account | addIcon }} ‧
            {{ user.createAt | fromNow }}
          </div>
        </div>
        <div class="comment">
          <span> {{ user.description | sliceSentence }} </span>
        </div>
        <button
          class="btn delete"
          :disabled=" isProcessing "
          @click.prevent.stop="deleteTweet(user.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { Toast } from './../utils/helpers'
import adminApi from './../apis/admin'
import UserThumbnail from './UserThumbnail.vue'
// 測試使用
// import { apiHelper, Toast } from './../utils/helpers'
// const dummyList = [
//   {
//     id: 26,
//     userData: {
//       id: 21,
//       account: 'cindy266',
//       name: '鰻魚燒',
//       avatar:
//         'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
//     },
//     description: '今天天氣好好喔!!',
//     replyAmount: 12,
//     likeAmount: 263,
//     userLiked: true,
//     createAt: '2016-08-29T09:12:33.001+0000'
//   },
//   {
//     id: 22,
//     userData: {
//       id: 21,
//       account: 'cindy266',
//       name: '鰻魚燒',
//       avatar:
//         'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
//     },
//     description: '今天天氣好好喔!!',
//     replyAmount: 12,
//     likeAmount: 263,
//     userLiked: true,
//     createAt: '2016-08-29T09:12:33.001+0000'
//   },
//   {
//     id: 23,
//     userData: {
//       id: 21,
//       account: 'cindy266',
//       name: '鰻魚燒',
//       avatar:
//         'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg'
//     },
//     description: '今天天氣好好喔!!',
//     replyAmount: 12,
//     likeAmount: 263,
//     userLiked: true,
//     createAt: '2016-08-29T09:12:33.001+0000'
//   }
// ]
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
  mixins: [fromNowFilter],
  data () {
    return {
      users: {},
      isProcessing: false
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers () {
      try {
        const { data } = await adminApi.getTweets()
        console.log(data)
        this.users = data
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
        const { data } = await adminApi.deleteTweet({ tweetId })
        this.isProcessing = true
        // console.log(data)
        // console.log(tweetId)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.fetchUsers()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除篇推文'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  min-width: 1062px;
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
    }
  }
}
</style>
