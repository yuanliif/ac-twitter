<template>
  <div
    v-show="!isLoading"
    class="tweet-list"
  >
    <portal to="modals">
      <ReplyModal
        :order="3"
        :show="show"
        :tweet="modalTweet"
        @after-reply="$emit('after-reply', $event)"
        @close="closeModal"
      />
    </portal>
    <!-- 推文顯示清單 -->
    <template v-show="tweets.length > 0">
      <Tweet
        v-for="tweet in tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
        @open-reply-modal="openReplyModal($event)"
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
import ReplyModal from '@/components/ReplyModal.vue'

export default {
  components: {
    Tweet,
    ReplyModal
  },
  props: {
    tweets: {
      type: Array,
      required: true,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      show: false,
      modalTweet: {}
    }
  },
  watch: {
    tweets: {
      handler: function (newValue, oldValue) {

      },
      deep: true
    }
  },
  methods: {
    openReplyModal (tweet) {
      this.show = true
      this.modalTweet = tweet
    },
    closeModal () {
      this.show = false
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
