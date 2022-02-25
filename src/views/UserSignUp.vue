<template>
  <form
    class="main"
    @submit.stop.prevent="handleSubmit"
  >
    <div class="sign-up-heading">
      <img
        :src="LogoImg"
        class="logo-img"
      >
      <h1 class="sign-up-title">
        建立你的帳號
      </h1>
    </div>
    <div class="sign-up-content">
      <label for="account">
        <input
          v-model="account"
          type="text"
          name="account"
        >
        <span class="input-title">帳號</span>
      </label>
      <label for="name">
        <input
          v-model="name"
          type="text"
          name="name"
        >
        <span class="input-title">名稱</span>
      </label>
      <label for="email">
        <input
          v-model="email"
          type="text"
          name="email"
        >
        <span class="input-title">Email</span>
      </label>
      <label for="password">
        <input
          v-model="password"
          type="text"
          name="password"
        >
        <span class="input-title">密碼</span>
      </label>
      <label for="password-check">
        <input
          v-model="passwordCheck"
          type="text"
          name="password-check"
        >
        <span class="input-title">密碼確認</span>
      </label>
    </div>
    <div class="sign-up-button">
      <button
        class="sign-up"
        type="submit"
      >
        註冊
      </button>
    </div>
    <div class="cancel">
      <a
        href="#"
        class="cancel"
        @click.prevent.stop="handleCancel"
      > 取消</a>
    </div>
  </form>
</template>

<script>
import LogoImg from '../assets/images/Logo.png'
import { inputValidationMethod } from '@/utils/mixins'
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

const inputKeys = ['account', 'name', 'email', 'password', 'passwordCheck']
const inputConfig = {
  account: {
    label: '帳號',
    inputType: 'text',
    minlength: 1,
    maxlength: 20,
    required: true,
    prefix: '@'
  },
  name: {
    label: '名稱',
    inputType: 'text',
    maxlength: 50,
    showLimit: true
  },
  email: {
    label: 'Email',
    inputType: 'email',
    required: true
  },
  password: {
    label: '密碼',
    inputType: 'password',
    minlength: 5,
    maxlength: 20,
    required: true
  },
  passwordCheck: {
    label: '密碼確認',
    inputType: 'password',
    minlength: 5,
    maxlength: 20,
    required: true
  }
}

export default {
  mixins: [inputValidationMethod],
  data () {
    return {
      LogoImg,
      account: '',
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      inputKeys,
      config: inputConfig,
      isLoading: true,
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        if (
          !this.account ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
        }

        const { data } = await authorizationAPI.userSignUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$router.push({ name: 'user-sign-in' })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法註冊，請稍後再試'
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

  .sign-up-heading {
    display: flex;
    flex-direction: column;
    .logo-img {
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }

    .sign-up-title {
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

  .sign-up-content {
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

  .cancel {
    display: flex;
    justify-content: center;
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
