<template>
  <div class="main">
    <div class="main-header">
      <div class="title">
        <h3>首頁</h3>
      </div>
      <div class="create-tweet">
        <img
          :src="UserAvatar"
          class="user-avatar"
        >
        <div class="text-input">
          <span>有什麼新鮮事?</span>
        </div>
        <button class="create-tweet-button">
          推文
        </button>
      </div>
    </div>
    <div class="main-content">
      <img
        :src="UsersPhoto"
        class="others-avatar"
      >
      <div class="tweet">
        <div class="users-info">
          <div class="name">
            Apple
          </div>
          <div class="account">
            @apple ・
          </div>
          <div class="time">
            3 小時
          </div>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
        </div>
        <div class="tweet-feedback">
          <div class="tweet-comments">
            <span>#</span>
            <span>13</span>
          </div>
          <div class="tweet-liked">
            <span>#</span>
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <img
        :src="UsersPhoto"
        class="others-avatar"
      >
      <div class="tweet">
        <div class="users-info">
          <div class="name">
            Apple
          </div>
          <div class="account">
            @apple ・
          </div>
          <div class="time">
            3 小時
          </div>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
        </div>
        <div class="tweet-feedback">
          <div class="tweet-comments">
            <span>#</span>
            <span>13</span>
          </div>
          <div class="tweet-liked">
            <span>#</span>
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <img
        :src="UsersPhoto"
        class="others-avatar"
      >
      <div class="tweet">
        <div class="users-info">
          <div class="name">
            Apple
          </div>
          <div class="account">
            @apple ・
          </div>
          <div class="time">
            3 小時
          </div>
        </div>
        <div class="tweet-content">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
        </div>
        <div class="tweet-feedback">
          <div class="tweet-comments">
            <span>#</span>
            <span>13</span>
          </div>
          <div class="tweet-liked">
            <span>#</span>
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 600px;
  height: 100%;
  margin: 0 auto;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;

  .main-header {
    .title {
      height: 55px;
      border-bottom: 1px solid#e6ecf0;
      padding-left: 15px;
      padding-top: 15px;
      h3 {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
      }
    }

    .create-tweet {
      width: 100%;
      height: 120px;
      padding-left: 15px;
      padding-top: 15px;
      border-bottom: 10px solid #e6ecf0;
      position: relative;

      span {
        position: absolute;
        top: 21px;
        left: 75px;
        font-size: 18px;
        line-height: 26px;
        color: #9197a3;
      }

      .create-tweet-button {
        position: absolute;
        right: 15px;
        bottom: 10px;
        width: 66px;
        height: 38px;
        background-color: #ff6600;
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
        border-radius: 100px;
        border: none;
      }
    }
  }

  .main-content {
    width: 100%;
    padding-left: 15px;
    padding-top: 15px;
    display: flex;
    border-bottom: 1px solid #e6ecf0;
    .others-avatar {
      width: 50px;
      height: 50px;
    }

    .tweet {
      margin-left: 10px;

      .users-info {
        display: flex;
        .name {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          color: #1c1c1c;
          margin-right: 5px;
        }

        .account {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          color: #657786;
        }

        .time {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          color: #657786;
        }
      }

      .tweet-content {
        width: 510px;
        height: 60px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        margin-top: 6px;
      }

      .tweet-feedback {
        display: flex;
        margin-top: 13px;
        margin-bottom: 14px;
        width: 130px;
        justify-content: space-between;
      }
    }
  }
}
</style>

<script>
import UserAvatar from './../assets/images/Photo.png'
import UsersPhoto from './../assets/images/UsersPhoto.png'
export default {
  data () {
    return {
      UserAvatar,
      UsersPhoto
    }
  }
}
</script>
