<template>
  <div class="container">
    <div class="logo d-flex justify-content-center">
      <img
        src="./../assets/images/Logo_@2x_50.png"
        alt="ac-logo"
        style="width: 50px"
      >
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
          <div class="alert">
            <p />
          </div>
        </div>
      </div>

      <button
        class="btn btn-lg btn-block"
        type="submit"
      >
        登入
      </button>

      <div class="front-login d-flex justify-content-end">
        <p>
          <router-link
            class="to-signup"
            to="/signup"
          >
            前台登入
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
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
        const response = await authorizationAPI.adminSignIn({
          account: this.account,
          password: this.password
        })
        // TODO: 檢查data中的資料
        // const { data } = response;
        console.log('response', response)
        // localStorage.setItem('token', data.token);
        // if (data.status === 'error') {
        //   throw new Error(data.message);
        // }
        this.$router.push('/admin/users')
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '帳號不存在'
        })
        this.isProcessing = false
        console.dir(error)
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
  color: #1C1C1C;
}
.container {
  padding-top: 60px;
  .logo {
    margin-bottom: 20px;
    img {
      width: 50px;
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
  }
  .front-login {
    margin-top: 20px;
    p {
      position: relative;
      .to-signup {
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
