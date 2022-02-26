<template>
  <!-- 使用者Profile推文區域（待完成） -->
  <div class="tab-container">
    <!-- 推文列表 -->
    <TweetList :user-id="currentUser.id" />
  </div>
</template>

<script>
import TweetList from '@/components/TweetList.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TweetList
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
