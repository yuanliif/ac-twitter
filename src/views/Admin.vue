<template>
  <div class="container">
    <div class="logo d-flex justify-content-center">
      <icon
        icon-name="logo-50"
        icon-class="logo-50"
      />
    </div>
    <form
      class="w-70 mx-auto"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center">
        <h1>後台登入</h1>
      </div>
      <div class="form-label-group">
        <div class="form-label">
          <input
            id="account"
            v-model="account"
            name="account"
            type="text"
            class="form-control"
            autocomplete="username"
            required
            autofocus
          >
          <label for="account">帳號</label>
          <span class="line" />
        </div>

        <div class="form-label">
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="form-control"
            autocomplete="current-password"
            required
          >
          <label for="password">密碼</label>
          <span class="line" />
        </div>
      </div>

      <button
        class="btn btn-lg btn-block btn-control"
        type="submit"
        :disabled="isProcessing"
      >
        登入
      </button>

      <div class="front-login d-flex justify-content-end">
        <p>
          <router-link
            class="to-signin"
            to="/signin"
          >
            前台登入
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationApi from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        // 沒有輸入帳號或是密碼
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入帳號和密碼'
          })
          return
        }

        this.isProcessing = true
        const { data } = await authorizationApi.adminSignIn({
          account: this.account,
          password: this.password
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { userData } = data

        // *將token存入localStorage
        localStorage.setItem('token', data.token)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // *傳入vuex
        this.$store.commit('setCurrentUser', userData)
        this.$router.push('/admin/tweets')
      } catch (error) {
        console.error(error)
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
  box-sizing: border-box;
  color: #1c1c1c;
}
.container {
  padding-top: 60px;
  .logo {
    margin-bottom: 20px;
    svg {
      width: 50px;
      height: 50px;
    }
  }
}
form {
  max-width: 540px;
  h1 {
    font-size: 23px;
    line-height: 33.3px;
    margin-bottom: 0px;
  }
  .form-label-group {
    & :first-child {
      margin-top: 40px;
    }
    & :last-child {
      margin-top: 30px;
    }
    .form-label {
      position: relative;
      height: 52px;
      label {
        position: absolute;
        margin: 0;
        top: 5px;
        left: 10px;
        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #657786;
      }
      input {
        height: 52px;
        margin: 0;
        background-color: #f5f8fa;
        border-radius: 4px;
        border: none;
        font-weight: 500;
        font-size: 19px;
        padding-top: 25px;
        &:focus {
          outline: none;
          box-shadow: none;
        }
        &:hover ~ .line,
        &:focus ~ .line {
          background-color: #50b5ff;
        }
      }
      .line {
        display: block;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: #657786;
        border-radius: 0px 0px 4px 4px;
      }
    }
  }
  button {
    margin-top: 40px;
    border-radius: 50px;
    background-color: #ff6600;
    color: #fff;
    font-size: 18px;
    line-height: 26px;
    cursor: pointer;
  }
  .front-login {
    margin-top: 20px;
    p {
      position: relative;
      .to-signin {
        color: #0099ff;
        font-size: 18px;
        line-height: 26px;
        text-decoration: none;
        &::after {
          content: '';
          position: absolute;
          display: block;
          top: 26px;
          width: 72px;
          height: 1px;
          top: 22px;
          background-color: #0099ff;
        }
      }
    }
  }
}
</style>
