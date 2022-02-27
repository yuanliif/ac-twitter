<template>
  <div
    v-show="!isLoading"
    class="reply-list"
  >
    <!-- 推文顯示清單 -->
    <template v-show="replies.length > 0">
      <Reply
        v-for="reply in replies"
        :key="reply.id"
        :initial-reply="reply"
      />
    </template>
    <h1
      v-show="isLoading === false && replies.length === 0"
      class="default-text"
    >
      尚無推文與回覆
    </h1>
  </div>
</template>

<script>
import Reply from '@/components/Reply.vue'

export default {
  components: {
    Reply
  },
  props: {
    replies: {
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
  watch: {
    replies: {
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-list {
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
