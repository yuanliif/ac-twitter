<template>
  <form
    class="main"
    @submit.prevent.stop="handleSubmit"
  >
    <div class="sign-in-heading">
      <img
        :src="LogoImg"
        class="logo-img"
      >
      <h1 class="sign-in-title">
        登入 Alphitter
      </h1>
    </div>
    <div class="sign-in-content">
      <label for="account">
        <input
          v-model="account"
          type="text"
          name="account"
        >
        <span class="input-title">帳號</span>
      </label>

      <label for="password">
        <input
          v-model="password"
          type="text"
          name="password"
        >
        <span class="input-title">密碼</span>
      </label>

    </div>
    <div class="sign-in-button">
      <button class="sign-up">
        登入
      </button>
    </div>
    <div class="other-option">
      <router-link
        to='/signup'
        class="cancel"
        @click.prevent.stop="handleCancel"
      > 註冊 Alphitter</router-link>
      <span>·</span>
      <a
        href="#"
        class="cancel"
        @click.prevent.stop="handleCancel"
      > 後台登入</a>
    </div>
  </form>
</template>

<script>
import LogoImg from '../assets/images/Logo.png'
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      LogoImg,
      account: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.account) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號'
          })

          return
        }

        if (!this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入密碼'
          })

          return
        }

        const response = await authorizationAPI.userSignIn({
          account: this.account,
          password: this.password
        })

        console.log('response', response)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法登入，請稍後再試'
        })
      }
    },
    handleCancel () {
      this.account = ''
      this.name = ''
      this.email = ''
      this.password = ''
      this.passwordCheck = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 540px;
  height: 100%;
  margin: 60px auto;

  .sign-in-heading {
    display: flex;
    flex-direction: column;
    .logo-img {
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }

    .sign-in-title {
      font-family: 'Noto Sans TC';
      font-style: normal;
      font-weight: bold;
      font-size: 23px;
      line-height: 33px;
      display: inline-block;
      margin: 0 auto;
      margin-top: 20px;
    }
  }

  .sign-in-content {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    label {
      position: relative;
      margin-bottom: 30px;

      input {
        width: 100%;
        height: 52px;
        background-color: #f5f8fa;
        border: none;
        border-bottom: 2px solid #657786;
        border-radius: 0px 0px 4px 4px;
        padding-top: 25px;
        padding-left: 10px;
      }
      .input-title {
        position: absolute;
        top: 5px;
        left: 10px;
        font-family: 'Noto Sans TC';
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        color: #657786;
      }
    }
  }

  .sign-up {
    margin: 10px auto 20px;
    width: 100%;
    height: 46px;
    background-color: #ff6600;
    border-radius: 50px;
    border: none;
    color: #ffffff;
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
  }

  .other-option {
    display: flex;
    justify-content: end;
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #0099ff;
    a {
      text-decoration: underline;
    }
  }
}
</style>
