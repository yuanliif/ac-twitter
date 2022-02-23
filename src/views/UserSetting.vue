<template>
  <div class="page-container">
    <SiteNav />
    <section
      v-show="!isLoading"
      class="setting-container"
    >
      <div class="page-header">
        帳戶設定
      </div>
      <form
        class="setting-form"
        @submit.stop.prevent="handleSubmit"
      >
        <GeneralInput
          v-for="key in inputKeys"
          :key="key"
          v-bind="config[key]"
          :initial-value="data[key]"
          :name="key"
          :error-message="error[key]"
          @input-change="data[key] = $event"
        />
        <button
          type="submit"
          class="btn-submit btn-control"
          :disabled="isProcessing"
        >
          儲存
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import GeneralInput from '@/components/GeneralInput.vue'
import usersAPI from '@/apis/users'
import { inputValidationMethod } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

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

// 再串接Vuex前，先用dummyUser頂著
const dummyUser = {
  id: 21,
  account: 'cindy266',
  name: '鰻魚燒',
  cover: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
  avatar: 'https://i.epochtimes.com/assets/uploads/2021/08/id13156667-shutterstock_376153318-450x322.jpg',
  introduction: '我是絕對不可以吃的鰻魚燒，不可以吃我會遭天譴的',
  email: 'aaa@bbb.ccc',
  follower: 56,
  following: 65
}

export default {
  components: {
    SiteNav,
    GeneralInput
  },
  mixins: [inputValidationMethod],
  data () {
    return {
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
      config: inputConfig,
      isLoading: true,
      isProcessing: false
    }
  },
  created () {
    this.fetchUser(dummyUser.id)
  },
  methods: {
    async fetchUser (userId) {
      try {
        this.isLoading = true
        const response = await usersAPI.getUserData({ userId })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        this.data = {
          ...this.data,
          ...response.data
        }

        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法載入使用者資料，請稍後再試'
        })
      }
    },
    async handleSubmit (e) {
      try {
        let status
        let message
        let pass = true;

        // 表單發送前的資料驗證
        // 表單資料全部驗證完後，再決定是否送出表單，或者把所有的錯誤顯示出來
        ({ status, message } = this.checkAccount(this.data.account))
        if (status === false) {
          this.error.account = message
          pass = false
        }

        ({ status, message } = this.checkName(this.data.name))
        if (status === false) {
          this.error.name = message
          pass = false
        }

        ({ status, message } = this.checkEmail(this.data.email))
        if (status === false) {
          this.error.email = message
          pass = false
        }

        ({ status, message } = this.checkPassword(this.data.password))
        if (status === false) {
          this.error.password = message
          pass = false
        }

        ({ status, message } = this.checkPassword(this.data.passwordCheck))
        if (status === false) {
          this.error.passwordCheck = message
          pass = false
        } else if (this.data.password !== this.data.passwordCheck) {
          this.error.passwordCheck = '密碼不一致'
          pass = false
        }

        if (pass === false) {
          return
        }

        this.isProcessing = true

        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.updateUserSetting({ userId: dummyUser.id, formData })

        if (data.status !== 'success') {
          this.error.account = data.message
          return
        }

        Toast.fire({
          icon: 'success',
          title: '成功修改使用者設定'
        })

        // 成功修改使用者設定後，清空密碼，避免使用者快速再送出重複的設定
        this.data.password = ''
        this.data.passwordCheck = ''
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法修改使用者設定，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  color: #1C1C1C;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-family: 'Noto Sans TC', serif;
  height: 100vh;
  width: 100vw;
}

section.setting-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: nowrap;

  .page-header {
    border-bottom: 1px solid #E6ECF0;
    font-size: 19px;
    font-weight: bold;
    line-height: 28px;
    padding-bottom: 14px;
    padding-left: 20px;
    padding-top: 13px;
  }
}

form.setting-form {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  padding-top: 30px;
  width: 642px;

  .btn-submit {
    align-self: flex-end;
    border-radius: 50px;
    font-size: 18px;
    line-height: 26px;
    margin-right: 6px;
    margin-top: 20px;
    padding: 10px 40px;
  }
}

</style>
