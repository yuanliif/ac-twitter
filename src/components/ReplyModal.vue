<template>
  <!-- transition作為Modal開啟關閉的動畫效果 -->
  <transition name="fade">
    <div v-show="show">
      <div
        class="modal show reply-modal"
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
              <!-- 參考Reply，做成Tweet樣式 -->
              <section class="tweet-container">
                <section class="avatar-part">
                  <UserThumbnail :initial-user="((tweet.userData) ? tweet.userData : {})" />
                  <div class="vertical-bar" />
                </section>
                <section class="content-part">
                  <div class="title-part">
                    <div
                      class="user-name"
                      :title="(tweet.userData) ? emptyName(tweet.userData.name, tweet.userData.account) : ''"
                    >
                      {{ (tweet.userData) ? emptyName(tweet.userData.name, tweet.userData.account) : '' }}
                    </div>
                    <div class="account-and-time">
                      {{ ((tweet.userData) ? tweet.userData.account : '') | addPrefix }}・{{ tweet.createdAt | timeFormat }}
                    </div>
                  </div>
                  <div class="description">
                    {{ tweet.description }}
                  </div>
                  <div class="reply-to">
                    <span class="text">回覆</span>
                    <span class="account">{{ ((tweet.userData) ? tweet.userData.account : '') | addPrefix }}</span>
                  </div>
                </section>
              </section>
              <!-- 參考TweetBox -->
              <section
                class="reply-input-box"
              >
                <section class="avatar-part">
                  <UserThumbnail :initial-user="currentUser" />
                </section>
                <section class="input-part">
                  <textarea
                    v-model.trim.lazy="comment"
                    placeholder="推你的回覆"
                    maxlength="140"
                  />
                  <div class="control-part">
                    <span
                      class="error-message"
                      title="error"
                    >{{ error }}</span>
                    <button
                      class="btn-control btn-reply"
                      :disabled="isProcessing"
                      @click.stop.prevent="reply"
                    >
                      回覆
                    </button>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show" />
    </div>
  </transition>
</template>

<script>
import UserThumbnail from '@/components/UserThumbnail'
import { inputValidationMethod, emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter } from '@/utils/mixins'
import tweetsAPI from '@/apis/tweets'
import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    UserThumbnail
  },
  mixins: [inputValidationMethod, emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter],
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    tweet: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      comment: '',
      error: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async reply () {
      try {
        const { status, message } = this.checkTweet(this.comment)

        this.error = ''
        if (status === false) {
          this.error = message
          return
        }

        this.isProcessing = true

        const { data } = await tweetsAPI.postReply({ tweetId: this.tweet.id, comment: this.comment })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$emit('after-reply', this.tweet.id)
        console.log(this.tweet)
        this.handleNewReply({
          id: new Date().valueOf(),
          comment: this.comment,
          replyerData: { ...this.currentUser },
          tweetId: new Date().valueOf(),
          tweetOwnerId: this.tweet.userData.id,
          tweetOwnerAccount: this.tweet.userData.account,
          createdAt: new Date()
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '回覆失敗，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    },
    handleNewReply (reply) {
      const route = this.$route

      if (route.name === 'tweet') {
        this.$store.commit('produceReply', reply)
        this.close()
      }
      this.close()
    },
    close () {
      this.comment = ''
      this.error = ''
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

.reply-modal {
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
}

section.tweet-container {
  border-bottom: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 15px 15px 0px 15px;
}

section.avatar-part {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-right: 10px;
  margin-top: 3px;

  .vertical-bar {
    background-color: #CCD6DD;
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    width: 2px;
  }
}

section.content-part {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;

  .title-part {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    font-size: 15px;
    line-height: 22px;

    .user-name {
      color: #1C1C1C;
      flex-shrink: 1;
      font-weight: bold;
      margin-right: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .account-and-time {
      color: #657786;
      flex-shrink: 0;
      font-weight: 500;
    }
  }

  .description {
    font-size: 15px;
    font-weight: normal;
    line-height: 22px;
    margin-top: 5px;
    word-break: break-all;
  }

  .reply-to {
    margin-top: 19px;
    margin-bottom: 13px;

    & > * {
      font-size: 13px;
      font-weight: 500;
      line-height: 13px;
    }

    .text {
      margin-right: 5px;
      color: #657786;
    }
    .account {
      color: #FF6600;
    }
  }
}

section.reply-input-box {
  border-bottom: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 15px 15px 15px;

  .input-part {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: nowrap;
    overflow: hidden;

    textarea {
      border: none;
      height: 142px;
      font-size: 18px;
      font-weight: 500;
      line-height: 26px;
      margin-top: 11px;
      padding: 0;
      resize: none;

      &::placeholder {
        color: #9197A3;
      }

      &:focus {
        border: none;
        outline: none;
      }
    }
  }
  .control-part {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    margin-top: 25px;

    .error-message {
      color: #FC5A5A;
      flex-shrink: 1;
      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .btn-reply {
      border-radius: 100px;
      font-size: 18px;
      font-weight: 500;
      flex-shrink: 0;
      line-height: 18px;
      margin-left: 15px;
      padding: 10px 15px;
    }
  }
}
</style>
