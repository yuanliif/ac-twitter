<template>
  <router-link
    v-slot="{ navigate }"
    :to="{ name: 'tweet', params: { id: tweet.id } }"
    class="tweet-container cursor-pointer"
    custom
  >
    <div @click="navigate">
      <section class="avatar-part">
        <UserThumbnail :initial-user="tweet.userData" />
      </section>
      <section class="content-part">
        <div class="title-part">
          <div
            class="user-name"
            :title="emptyName(tweet.userData.name, tweet.userData.account)"
          >
            {{ emptyName(tweet.userData.name, tweet.userData.account) }}
          </div>
          <div class="account-and-time">
            {{ tweet.userData.account | addPrefix }}・{{ tweet.createAt | timeFormat }}
          </div>
        </div>
        <div class="description">
          {{ tweet.description }}
        </div>
        <div class="control-group">
          <div class="control-container">
            <span class="event-area">
              <icon
                icon-name="reply"
                class="control-icon"
              />
              <span class="control-statistic">{{ tweet.replyAmount | numberFormat }}</span>
            </span>
          </div>
          <div class="control-container">
            <icon
              v-if="tweet.userLiked === false"
              icon-name="like"
              class="control-icon cursor-pointer icon-like"
              @click.native.stop.prevent="like(tweet.id)"
            />
            <icon
              v-else
              icon-name="like-checked"
              class="control-icon cursor-pointer icon-like-checked"
              @click.native.stop.prevent="unlike(tweet.id)"
            />
            <span class="control-statistic">{{ tweet.likeAmount | numberFormat }}</span>
          </div>
        </div>
      </section>
    </div>
  </router-link>
</template>

<script>
import UserThumbnail from '@/components/UserThumbnail.vue'
import { emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter } from '@/utils/mixins'
import tweetsAPI from '@/apis/tweets'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    UserThumbnail
  },
  mixins: [emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter],
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tweet: {},
      isProcessing: false
    }
  },
  created () {
    this.tweet = {
      ...this.tweet,
      ...this.initialTweet
    }
  },
  methods: {
    async like (tweetId) {
      if (this.isProcessing) {
        Toast.fire({
          icon: 'warning',
          title: '請稍後再試'
        })
        return
      }
      this.isProcessing = true

      try {
        const { data } = await tweetsAPI.like({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.tweet.userLiked = true
        this.tweet.likeAmount += 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法like推文，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    },
    async unlike (tweetId) {
      if (this.isProcessing) {
        Toast.fire({
          icon: 'warning',
          title: '請稍後再試'
        })
        return
      }
      this.isProcessing = true

      try {
        const { data } = await tweetsAPI.unlike({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.tweet.userLiked = false
        this.tweet.likeAmount -= 1
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法unlike推文，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-container {
  border-bottom: 1px solid #E6ECF0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 15px;
}

section.avatar-part {
  margin-right: 10px;
  margin-top: 3px;
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
    font-weight: 500;
    line-height: 22px;
    margin-top: 6px;
    word-break: break-all;
  }

  .control-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 13px;

    .control-container {
      color: #657786;
      width: 90px;

      .control-icon {
        height: 15px;
        margin-right: 10px;
        width: 15px;
      }

      .icon-like-checked {
        height: 24px;
        margin-right: 5px;
        width: 24px;
        & ~ .control-statistic {
          color: #E0245E;
        }
      }

      .control-statistic {
        font-size: 13px;
        font-weight: 500;
        line-height: 13px;
      }
    }
  }
}
</style>
