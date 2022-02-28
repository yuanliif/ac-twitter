<!--
名稱：泛用型追蹤按鈕
用法：使用時傳入使用者資訊（至少須含id和followed）
功能：
  1. 顯示「正在跟隨」或「跟隨」
  2. 按下按鈕時，在請求完成前，使用者無法再觸發
  3. 請求完成後，依情況自己變動狀態資訊
  4. 把跟隨或者取消跟隨發出事件通知上層
-->

<template>
  <button
    class="btn-follow"
    :class="{'btn-control': user.followed, 'btn-control-outline': !user.followed}"
    :disabled="isProcessing"
    @click="toggleFollow(user.followed, user.id)"
  >
    {{ user.followed ? '正在跟隨' : '跟隨' }}
  </button>
</template>

<script>
import followshipsAPI from '@/apis/followships'
import { Toast } from '@/utils/helpers'

export default {
  props: {
    initialUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      user: {
        id: -1,
        followed: false
      },
      isProcessing: false
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    }
  },
  created () {
    this.user = {
      ...this.user,
      ...this.initialUser
    }
  },
  methods: {
    toggleFollow (isFollowed, userId) {
      if (isFollowed) {
        this.unfollow(userId)
      } else {
        this.follow(userId)
      }
    },
    async follow (userId) {
      try {
        this.isProcessing = true

        const { data } = await followshipsAPI.follow({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user.followed = true
        this.$emit('user-followed')
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法跟隨使用者，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    },
    async unfollow (userId) {
      try {
        this.isProcessing = true

        const { data } = await followshipsAPI.unfollow({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user.followed = false
        this.$emit('user-unfollowed')
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨使用者，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-follow {
  border-radius: 100px;
  height: inherit;
  font-size: 15px;
  line-height: 15px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
