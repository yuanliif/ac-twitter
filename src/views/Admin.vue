<template>
  <div class="container py-5">
    <div class="logo d-flex justify-content-center my-3">
      <img
        src="./../assets/images/Logo_@2x.png"
        alt="ac-logo"
        style="width: 50px"
      >
    </div>
    <form
      class="w-70 mx-auto"
      @submit.prevent.stop="handleSubmit"
    >
      <div class="text-center">
        <h1 class="font-weight-bold">
          後台登入
        </h1>
      </div>

      <div class="form-label-group">
        <input
          id="account"
          v-model="account"
          name="account"
          type="email"
          class="form-control"
          autocomplete="username"
          required
          autofocus
        >
        <label for="account">帳號</label>
      </div>

      <div class="form-label-group">
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
            to="/signup"
            class="font-weight-bold"
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
        this.$router.push('/admin_main')
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
h1 {
  font-size: 23px;
}
form {
  width: 540px;
  .form-label-group {
    position: relative;
    margin-top: 32px;
    label {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 16px;
      color: rgb(150, 150, 150);
    }
    input {
      height: 52px;
      background-color: #f5f8fa;
      border: none;
      border-bottom: 2px #657786 solid;
      // *感覺有點上彎，再找方法修正
      font-size: 16px;
      &:focus ~ label,
      &:valid ~ label {
        display: none;
      }
    }
  }
  button {
    margin-top: 40px;
    border-radius: 50px;
    background-color: #ff6600;
    color: #fff;
  }
  .front-login {
    margin-top: 20px;
  }
}
</style>
