<!-- 熱門使用者推薦列 -->
<template>
  <div
    v-show="!isLoading"
    class="list-container"
  >
    <div class="list-header">
      Popular
    </div>
    <section
      v-for="user in userList"
      :key="user.id"
    >
      <div class="break" />
      <div class="user-container">
        <span class="photo">
          <UserThumbnail :initial-user="user" />
        </span>
        <span class="info">
          <div
            class="name"
            :title="emptyName(user.name, user.account)"
          >
            {{ emptyName(user.name, user.account) }}
          </div>
          <div
            class="account"
            :title="user.account"
          >
            @{{ user.account }}
          </div>
        </span>
        <span class="control">
          <FollowControlButton :initial-user="user" />
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import followshipsAPI from '@/apis/followships'
import { Toast } from '@/utils/helpers'
import { emptyNameMethod } from '@/utils/mixins'
import UserThumbnail from '@/components/UserThumbnail.vue'
import FollowControlButton from '@/components/FollowControlButton.vue'

// 測試資料，請保留以供測試

/*
const dummyList = [
  // 一般資料
  {
    id: 17,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 帳號下限
  {
    id: 18,
    account: 'c',
    name: 'abc',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 帳號上限
  {
    id: 19,
    account: 'cindy266cindy266cind',
    name: 'abc',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 暱稱下限
  {
    id: 20,
    account: 'cindy266',
    name: 'x',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 暱稱上限
  {
    id: 21,
    account: 'cindy266',
    name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 沒有暱稱
  {
    id: 22,
    account: 'cindy266',
    name: '',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: true
  },
  // 未被跟隨
  {
    id: 23,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 圖片無法載入
  {
    id: 24,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://wwww.google.com',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 沒有圖
  {
    id: 25,
    account: 'cindy266',
    name: 'abc',
    avatar: '',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 正方形圖片
  {
    id: 26,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://pbs.twimg.com/profile_images/1222168673399402496/IbBY8sB-_400x400.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 長方形圖片（較長）
  {
    id: 27,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://museum.acgn-stock.com/images/08.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  },
  // 長方形圖片（較寬）
  {
    id: 28,
    account: 'cindy266',
    name: 'abc',
    avatar: 'https://museum.acgn-stock.com/images/33.jpg',
    introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
    followed: false
  }
]
*/

export default {
  components: {
    UserThumbnail,
    FollowControlButton
  },
  mixins: [emptyNameMethod],
  data () {
    return {
      userList: [],
      isLoading: false,
      userId: -1
    }
  },
  watch: {
    // 確保先有使用者資訊，再取得推薦使用者清單
    '$store.state.currentUser': {
      handler: function (newValue, oldValue) {
        this.userId = newValue.id
        this.fetchUserList()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 測試時使用
    /*
    fetchUserList () {
      // 避免推薦列表中，出現使用者自己
      this.userList = dummyList.filter(user => user.id !== this.userId).slice(0, 10)
    }
    */
    async fetchUserList () {
      try {
        const response = await followshipsAPI.getTopUsers()

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        const { data } = response

        // 避免推薦列表中，出現使用者自己
        this.userList = data.filter(user => user.id !== this.userId).slice(0, 10)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法載入最受歡迎使用者資料，請稍後再試'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  background-color: #F5F8FA;
  border-radius: 14px;
  color: #1C1C1C;
  font-family: 'Noto Sans TC', serif;
  max-width: 350px;
  padding-bottom: 1px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: left;
}
.list-header {
  font-size: 18px;
  font-weight: bold;
  line-height: 26px;
  padding-top: 10px;
  padding-bottom: 9px;
}
.break {
  background-color: #E6ECF0;
  height: 1px;
  margin-left: -15px;
  margin-right: -15px;
}
.user-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 15px;
  font-weight: bold;
  height: 70px;
  line-height: 15px;

  .photo {
    margin-right: 10px;
  }

  .info {
    .name,
    .account {
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
      width: 160px;
    }

    .account {
      color: #657786;
      margin-top: 3px;
    }
  }

  .control {
    height: 35px;
    margin-left: auto;
  }
}
</style>
