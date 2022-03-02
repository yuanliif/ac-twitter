<template>
  <section
    class="tweet-input-box"
  >
    <section class="avatar-part">
      <UserThumbnail :initial-user="currentUser" />
    </section>
    <section class="input-part">
      <textarea
        v-model.trim.lazy="description"
        placeholder="有什麼新鮮事？"
        maxlength="140"
      />
      <div class="control-part">
        <span
          class="error-message"
          title="error"
        >{{ error }}</span>
        <button
          class="btn-control btn-tweet"
          :disabled="isProcessing"
          @click.stop.prevent="tweet"
        >
          推文
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import UserThumbnail from '@/components/UserThumbnail'
import { inputValidationMethod } from '@/utils/mixins'
import tweetsAPI from '@/apis/tweets'
import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    UserThumbnail
  },
  mixins: [inputValidationMethod],
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      description: '',
      error: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    errorMessage (newValue) {
      console.log(newValue)
      this.error = newValue
    }
  },
  methods: {
    async tweet () {
      try {
        const { status, message } = this.checkTweet(this.description)

        this.error = ''
        if (status === false) {
          this.error = message
          this.$emit('update-error', this.error)
          return
        }

        this.$emit('update-error', this.error)

        this.isProcessing = true

        const { data } = await tweetsAPI.post({ description: this.description })

        if (data.status !== 'success') {
          throw new Error(data.status)
        }

        const { tweetData } = data

        this.$emit('after-tweet', {
          id: tweetData.id,
          userData: this.currentUser,
          description: this.description,
          replyAmount: 0,
          likeAmount: 0,
          userLiked: false,
          createdAt: new Date()
        })

        this.description = ''
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '發推失敗，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section.tweet-input-box {
  border-bottom: 10px solid #E6ECF0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 15px;

  .input-part {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: nowrap;
    margin-left: 10px;
    overflow: hidden;

    textarea {
      border: none;
      height: 26px;
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

    .btn-tweet {
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
