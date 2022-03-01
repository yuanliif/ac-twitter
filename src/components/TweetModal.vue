<template>
  <!-- transition作為Modal開啟關閉的動畫效果 -->
  <transition name="fade">
    <div v-show="show">
      <div
        class="modal show tweet-modal"
        tabindex="-1"
        role="dialog"
        @click.self="close"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <icon
                class="icon-close cursor-pointer"
                icon-name="cross"
                @click.native.stop.prevent="close"
              />
            </div>
            <div class="modal-body">
              <TweetBox
                :error-message="errorMessage"
                @after-tweet="handleNewTweet($event)"
                @update-error="errorMessage = $event"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show" />
    </div>
  </transition>
</template>

<script>
import TweetBox from '@/components/TweetBox.vue'

export default {
  components: {
    TweetBox
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      errorMessage: ''
    }
  },
  watch: {
    show (newValue, oldValue) {
      if (newValue === false) {
        this.errorMessage = ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    handleNewTweet (tweet) {
      this.$store.commit('produceTweet', tweet)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.tweet-modal {
  &.show {
    display: block;
  }

  .modal-dialog {
    height: 300px;
    margin-top: 54px;
    max-width: 600px;
    width: 600px;

    .modal-content {
      border-radius: 14px;
    }
  }
}

.modal-header {
  align-items: center;
  border-bottom: 1px solid #E6ECF0;
  justify-content: flex-start;
  padding: 15px;

  .icon-close {
    color: #FF6600;
    height: 24px;
    width: 24px;

    &:hover {
      opacity: 0.75;
    }
  }
}

.modal-body {
  padding: 0px;

  // 改寫底下TweetBox顯示樣式
  ::v-deep .tweet-input-box {
    border: none;
    padding: 15px;
  }

  ::v-deep section.tweet-input-box .input-part textarea {
      height: 140px;
  }
}
</style>
