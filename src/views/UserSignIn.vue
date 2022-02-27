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
      <GeneralInput
        v-for="key in inputKeys"
        :key="key"
        v-bind="inputConfig[key]"
        :name="key"
        :initial-value="data[key]"
        :error-message="error[key]"
        @input-change="data[key] = $event"
      />
    </div>
    <div class="sign-in-button">
      <button class="sign-up">
        登入
      </button>
    </div>
    <div class="other-option">
      <router-link
        to="/signup"
        class="route-control"
      >
        註冊 Alphitter
      </router-link>
      <span>·</span>
      <router-link
        to="/admin"
        class="route-control"
      >
        後台登入
      </router-link>
    </div>
  </form>
</template>

<script>
import LogoImg from '../assets/images/Logo.png'
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
import GeneralInput from './../components/GeneralInput.vue'
import { inputValidationMethod } from './../utils/mixins'
const inputKeys = ['account', 'password']
const inputConfig = {
  account: {
    label: '帳號',
    inputType: 'text',
    minlength: 1,
    maxlength: 20,
    required: true
  },
  password: {
    label: '密碼',
    inputType: 'password',
    minlength: 5,
    maxlength: 20,
    required: true
  }
}

export default {
  name: 'UserSignIn',
  components: {
    GeneralInput
  },
  mixins: [inputValidationMethod],

  data () {
    return {
      LogoImg,
      data: {
        account: '',
        password: ''
      },
      error: {
        account: '',
        password: ''
      },
      inputKeys,
      inputConfig
    }
  },
  methods: {
    async handleSubmit () {
      try {
        let status
        let message
        let pass = true

        ;({ status, message } = this.checkAccount(this.data.account))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkPassword(this.data.password))
        if (status === false) {
          this.error.password = message
          pass = false
        }

        if (pass === false) {
          return
        }

        const response = await authorizationAPI.userSignIn({
          account: this.data.account,
          password: this.data.password
        })

        console.log(response)

        const { data } = response

        localStorage.setItem('token', data.token)

        this.$store.commit('setCurrentUser', response.userData)

        this.$router.push('/home')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法登入，請稍後再試'
        })
      }
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

    .route-control {
      text-decoration: underline;
      color: #0099ff;
    }
  }
}
</style>
