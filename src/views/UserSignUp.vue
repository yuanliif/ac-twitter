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
      <GeneralInput
        v-for="key in inputKeys"
        :key="key"
        v-bind="inputConfig[key]"
        :name="key"
        :error-message="error[key]"
        :initial-value="data[key]"
        @input-change="data[key] = $event"
      />
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
import GeneralInput from './../components/GeneralInput.vue'
const inputKeys = ['account', 'name', 'email', 'password', 'passwordCheck']
const inputConfig = {
  account: {
    label: '帳號',
    inputType: 'text',
    minlength: 1,
    maxlength: 20,
    required: true
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
  name: 'UserSignUp',
  components: {
    GeneralInput
  },
  mixins: [inputValidationMethod],

  data () {
    return {
      LogoImg,

      data: {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
      },

      error: {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
      },

      inputKeys,
      inputConfig
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        let status
        let message
        let pass = true

        ;({ status, message } = this.checkAccount(this.data.account))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkName(this.data.name))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkEmail(this.data.email))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkPassword(this.data.password))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkPassword(this.data.passwordCheck))
        if (status === false) {
          this.error.account = message
          pass = false
        } else if (this.data.password !== this.data.passwordCheck) {
          this.error.passwordCheck = '密碼不一致'
          pass = false
        }

        if (pass === false) {
          return
        }

        const { data } = await authorizationAPI.userSignUp({
          account: this.data.account,
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
          passwordCheck: this.data.passwordCheck
        })

        if (data.status !== 'success') {
          if (/帳號/.test(data.message)) {
            this.error.account = data.message
            return
          }
          if (/名稱/.test(data.message)) {
            this.error.name = data.message
            return
          }
          if (/信箱/.test(data.message)) {
            this.error.email = data.message
            return
          }
          if (/密碼/.test(data.message)) {
            this.error.password = data.message
            return
          }
          this.error.account = data.message
          return
        }

        this.$router.push({ name: 'user-sign-in' })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法註冊，請稍後再試'
        })
      }
    },
    handleCancel (e) {
      this.data = {
        ...this.data,
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
      }

      this.error = {
        ...this.error,
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: ''
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
      color: #1c1c1c;
    }
  }

  .sign-up-content {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
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
