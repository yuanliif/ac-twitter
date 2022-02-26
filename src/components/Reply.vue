<template>
  <div class="reply-container">
    <section class="avatar-part">
      <UserThumbnail :initial-user="reply.replyerData" />
    </section>
    <section class="content-part">
      <div class="title-part">
        <div
          class="user-name"
          :title="emptyName(reply.replyerData.name, reply.replyerData.account)"
        >
          {{ emptyName(reply.replyerData.name, reply.replyerData.account) }}
        </div>
        <div class="account-and-time">
          {{ reply.replyerData.account | addPrefix }}・{{ reply.createAt | timeFormat }}
        </div>
      </div>
      <div class="reply-to">
        <span class="text">回覆</span>
        <span class="account">{{ reply.tweetOwerAccount | addPrefix }}</span>
      </div>
      <div class="reply">
        {{ reply.comment }}
      </div>
    </section>
  </div>
</template>

<script>
import UserThumbnail from '@/components/UserThumbnail.vue'
import { emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter } from '@/utils/mixins'

export default {
  components: {
    UserThumbnail
  },
  mixins: [emptyNameMethod, addPrefixFilter, numberFormatFilter, timeFormatFilter],
  props: {
    initialReply: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reply: {}
    }
  },
  created () {
    this.reply = {
      ...this.reply,
      ...this.initialReply
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-container {
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

  .reply-to {
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;

    .text {
      color: #657786;
      margin-right: 5px;
    }
    .account {
      color: #FF6600;
    }
  }

  .reply {
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
    word-break: break-all;
  }
}
</style>
