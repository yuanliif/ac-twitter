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
            <router-link :to="{ name: 'user-tweets', params: { id: user.id } }">
              {{ user.name }}
            </router-link>
          </div>
          <div class="account">
            <!-- TODO 加入真實時間 -->
            {{ user.account | addIcon }} ‧ {{ createdAt | fromNow }}
          </div>
        </div>
        <div class="comment">
          <span> {{ user.avatar | sliceSentence }} </span>
        </div>
        <div class="delete">
          <img
            src="./../assets/images/Delete_@2x.png"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import { apiHelper, Toast } from './../utils/helpers'
import UserThumbnail from './UserThumbnail.vue'
const dummyList = [
  // 一般資料
  {
    id: 17,
    account: 'cindy266',
    name: 'abc',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 帳號下限
  {
    id: 18,
    account: 'c',
    name: 'abc',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 帳號上限
  {
    id: 19,
    account: 'cindy266cindy266cind',
    name: 'abc',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 暱稱下限
  {
    id: 20,
    account: 'cindy266',
    name: 'x',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 暱稱上限
  {
    id: 21,
    account: 'cindy266',
    name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 沒有暱稱
  {
    id: 22,
    account: 'cindy266',
    name: '',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 未被跟隨
  {
    id: 23,
    account: 'cindy266',
    name: 'abc',
    avatar:
      'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 圖片無法載入
  {
    id: 25,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://wwww.google.com',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 沒有圖
  {
    id: 24,
    account: 'cindy266',
    name: 'abc',
    avatar: '',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  }
]
export default {
  components: {
    UserThumbnail
  },
  filters: {
    addIcon (account) {
      return '@' + account
    },
    sliceSentence (comment) {
      return comment.slice(0, 50) + '...'
    }
  },
  mixins: [fromNowFilter],
  data () {
    return {
      users: dummyList
    }
  },
  methods: {
    async fetchUsers () {
      try {
        const response = await apiHelper
        console.log(response)
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得資料'
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
    padding: 0 0 15px 15px;
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
      position: absolute;
      top: 19.5px;
      right: 19.5px;
    }
    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
}
</style>
