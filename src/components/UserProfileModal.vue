<template>
  <!-- transition作為Modal開啟關閉的動畫效果 -->
  <transition name="fade">
    <div v-show="show">
      <div
        class="modal show user-profile-modal"
        tabindex="-1"
        role="dialog"
        @click.self="close"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <form
            class="modal-content"
            @submit.stop.prevent="handleSubmit"
          >
            <section class="modal-header">
              <icon
                class="icon-close cursor-pointer"
                icon-name="cross"
                @click.native.stop.prevent="close"
              />
              <span class="header-text">編輯個人資料</span>
              <button
                class="btn-control btn-save"
                type="submit"
                :disabled="isProcessing"
              >
                儲存
              </button>
            </section>
            <section class="modal-body">
              <div class="user-cover">
                <img
                  v-show="user.cover"
                  :src="user.cover"
                  @error="user.cover = ''"
                >
                <span class="cover-control">
                  <input
                    id="cover-input"
                    ref="coverinput"
                    class="d-none"
                    type="file"
                    name="cover"
                    @change="handleCoverChange"
                  >
                  <label for="cover-input">
                    <icon
                      class="control-icon cursor-pointer"
                      icon-name="camera"
                    />
                  </label>
                  <icon
                    class="control-icon cursor-pointer"
                    icon-name="cross"
                    style="margin-left: 30px;"
                    @click.native.stop.prevent="undo"
                  />
                </span>
                <div class="user-avatar">
                  <div class="avatar-container">
                    <input
                      id="avatar-input"
                      class="d-none"
                      type="file"
                      name="avatar"
                      @change="handleAvatarChange"
                    >
                    <img
                      v-show="user.avatar"
                      :src="user.avatar"
                      @error="user.avatar = ''"
                    >
                    <label for="avatar-input">
                      <icon
                        class="control-icon cursor-pointer"
                        icon-name="camera"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="text-input-section">
                <GeneralInput
                  label="名稱"
                  input-type="text"
                  :maxlength="50"
                  name="name"
                  :initial-value="user.name"
                  :error-message="error.name"
                  :show-limit="true"
                />
                <CustomTextArea
                  label="自我介紹"
                  input-type="text"
                  :maxlength="160"
                  name="introduction"
                  :initial-value="user.introduction"
                  :error-message="error.introduction"
                  :show-limit="true"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
      <div class="modal-backdrop show" />
    </div>
  </transition>
</template>

<script>
import GeneralInput from '@/components/GeneralInput.vue'
import CustomTextArea from '@/components/CustomTextArea.vue'
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    GeneralInput,
    CustomTextArea
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      user: {
        id: -1,
        cover: '',
        avatar: '',
        initialCover: '',
        name: '',
        introduction: ''
      },
      error: {
        name: '',
        introduction: ''
      },
      isProcessing: false
    }
  },
  watch: {
    '$store.state.currentUser': {
      handler: function (newValue, oldValue) {
        this.user = {
          ...this.user,
          ...newValue
        }
        this.user.initialCover = this.user.cover
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleCoverChange (event) {
      const { files } = event.target

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.cover = this.user.initialCover
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.cover = imageURL
      }
    },
    handleAvatarChange (event) {
      const { files } = event.target

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.avatar = ''
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.avatar = imageURL
      }
    },
    undo () {
      this.user.cover = this.user.initialCover
      this.$refs.coverinput.value = null
    },
    async handleSubmit (event) {
      const form = event.target // <form></form>
      const formData = new FormData(form)

      for (const [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }

      try {
        this.isProcessing = true
        const { data } = await usersAPI.updateUserProfile({ userId: this.user.id, formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$emit('update')
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者Profile，請稍後再試'
        })
      } finally {
        this.isProcessing = false
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.user-profile-modal {
  &.show {
    display: block;
  }

  .modal-dialog {
    margin-top: 54px;
    max-width: 600px;
    width: 600px;

    .modal-content {
      border-radius: 14px;
    }
  }
}
form.modal-content {
  .modal-header {
    align-items: center;
    border-bottom: none;
    justify-content: flex-start;
    padding: 15px;

    .icon-close {
      color: #FF6600;
      height: 24px;
      width: 24px;

      &:hover {
        opacity: 0.75;
      }
    }
    .header-text {
      color: #1C1C1C;
      font-size: 19px;
      font-weight: bold;
      line-height: 28px;
      margin-left: 40px;
    }
    .btn-save {
      border-radius: 100px;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      margin-left: auto;
      padding: 5px 15px;
    }
  }
}
section.modal-body {
  padding: 0px;

  .user-cover {
    background-color: #999999;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 598px;

    & > img {
      height: inherit;
      object-fit: cover;
      width: inherit;
    }

    .cover-control {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 78px;
    }

    .control-icon {
      color: #FFFFFF;
      height: 24px;
      width: 24px;

      &:hover {
        opacity: 0.75;
      }
    }

    .avatar-container .control-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .user-avatar {
    background-color: #C4C4C4;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
    bottom: 0px;
    height: 120px;
    left: 15px;
    position: absolute;
    transform: translateY(50%);
    width: 120px;

    .avatar-container {
      clip-path: circle(56px at center);
      height: 112px;
      width: 112px;

      & > img {
        height: inherit;
        object-fit: cover;
        width: inherit;
      }
    }
  }
}
.text-input-section {
  padding: 80px 15px 50px 15px;
}
</style>
