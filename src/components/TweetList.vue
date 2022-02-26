<template>
  <div
    v-show="!isLoading"
    class="tweet-list"
  >
    <!-- 推文顯示清單 -->
    <template v-show="tweets.length > 0">
      <Tweet
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
      />
    </template>
    <h1
      v-show="isLoading === false && tweets.length === 0"
      class="default-text"
    >
      尚無推文
    </h1>
  </div>
</template>

<script>
import Tweet from '@/components/Tweet.vue'

export default {
  components: {
    Tweet
  },
  props: {
    tweets: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  watch: {
    tweets: {
      deep: true
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

  h1.default-text {
    font-weight: bold;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
