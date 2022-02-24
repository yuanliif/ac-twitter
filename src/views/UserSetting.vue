<template>
  <div class="page-container">
    <SiteNav />
    <section
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
import { mapState } from 'vuex'

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
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    // 監聽Vuex state中currentUser的變化，並把變動更新到容器所儲存的data
    '$store.state.currentUser': {
      handler: function (newValue, oldValue) {
        const { account, name, email } = newValue

        this.data = {
          ...this.data,
          account,
          name,
          email
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
        const { data } = await usersAPI.updateUserSetting({ userId: this.currentUser.id, formData })

        if (data.status !== 'success') {
          // 針對後端傳來的錯誤訊息，把帳號或信箱的重複提示，放到對應輸入框的錯誤提示訊息區域
          if (/帳號/.test(data.message)) {
            this.error.account = data.message
            return
          }
          if (/信箱/.test(data.message)) {
            this.error.email = data.message
            return
          }
          this.error.account = data.message
          return
        }

        Toast.fire({
          icon: 'success',
          title: '成功修改使用者設定'
        })

        // 確定使用者設定在後端更新成更後，把新的資訊寫回到Vuex裡
        this.$store.commit('setCurrentUser', {
          account: this.data.account,
          name: this.data.name,
          email: this.data.email
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
