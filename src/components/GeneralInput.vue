<!--
名稱：泛用型文字輸入框
用法：請參照Props區域，在使用時，傳入必要的設定
功能：
  1. 顯示初始文字
  2. 輸入內容長度限制
  3. 即時顯示輸入內容上限顯示
  4. 顯示錯誤提示訊息
  5. 有預設顯示、focus/active狀態顯示和錯誤狀態顯示
  6. 可設定輸入內容是否對頭尾空白進行去除
-->

<template>
  <section class="input-group">
    <span class="input-container">
      <span class="prefix">{{ prefix }}</span>
      <input
        :value="value"
        :class="{'invalid': !isValid}"
        :type="inputType"
        :minlength="minlength"
        :maxlength="maxlength"
        :name="name"
        :required="required"
        @input.stop.prevent="value = $event.target.value"
        @change.stop.prevent="inputChange($event.target.value)"
      >
      <div class="input-status-bar" />
    </span>
    <label class="input-label">{{ label }}</label>
    <div class="input-status-info">
      <div
        class="text"
        :title="errorMessage"
      >
        {{ errorMessage }}
      </div>
      <div
        v-show="showLimit && (maxlength > 0)"
        class="limit"
      >
        {{ limitText }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    // 輸入框是否有前綴
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    // 輸入框標籤文字
    label: {
      type: String,
      required: true,
      default: ''
    },
    // 輸入框type屬性
    inputType: {
      type: String,
      required: true,
      default: 'text'
    },
    // 輸入框文字最短設定
    minlength: {
      type: Number,
      required: false,
      default: -1
    },
    // 輸入框文字最長設定
    maxlength: {
      type: Number,
      required: false,
      default: -1
    },
    // 輸入框name屬性
    name: {
      type: String,
      required: true,
      default: ''
    },
    // 輸入框required屬性
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    // 輸入框起始值
    initialValue: {
      type: [String, Number],
      required: false,
      default: ''
    },
    // 輸入框錯誤提示訊息
    errorMessage: {
      type: String,
      required: false,
      default: ''
    },
    // 輸入框輸入內容上限顯示
    showLimit: {
      type: Boolean,
      required: false,
      default: false
    },
    // 輸入框文字內容是否去除頭尾空白
    doTrim: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      value: '',
      isValid: true
    }
  },
  computed: {
    limitText () {
      const validType = ['text', 'password']

      if (validType.includes(this.inputType) && this.maxlength > 0) {
        return `${this.value.length}/${this.maxlength}`
      }

      return ''
    }
  },
  watch: {
    initialValue (newValue) {
      this.value = newValue
    },
    errorMessage (newValue) {
      this.isValid = (newValue === '')
    }
  },
  created () {
    this.value = this.initialValue
  },
  methods: {
    inputChange (value) {
      if (typeof value === 'string' && this.doTrim === true) {
        this.value = value.trim()
      }

      // 通知上層輸入框的數值改變
      this.$emit('input-change', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
section.input-group {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 84px; // input + input-status-bar + input間的距離

  .input-label {
    color: #657786;
    font-size: 15px;
    left: 10px;
    line-height: 15px;
    position: absolute;
    top: 5px;
  }
  .input-container {
    background-color: #F5F8FA;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 19px;
    font-weight: 500;
    line-height: 29px;
    padding-left: 10px;
    position: relative;
    word-spacing: -.25rem;

    .prefix {
      flex-grow: 0;
      flex-shrink: 0;
      padding-bottom: 4px;
      padding-top: 20px;
    }

    .input-status-bar {
      bottom: 0;
      background-color: #657786;
      border-radius: 0px 0px 4px 4px;
      height: 2px;
      left: 0;
      position: absolute;
      right: 0;
    }
  }
  .input-status-info {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 15px;
    font-weight: 500;
    justify-content: space-between;
    line-height: 15px;
    margin-top: 5px;
    white-space: nowrap;

    .text {
      color: #FC5A5A;
      flex-shrink: 1;
      min-width: 0;
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
    }
    .limit {
      color: #657786;
    }
  }

  input {
    background-color: inherit;
    border: none;
    flex-grow: 1;
    padding-bottom: 4px;
    padding-left: 0px;
    padding-top: 20px;
  }
  input:focus {
    border: none;
    outline: none;
  }
  input:focus ~ .input-status-bar,
  input:hover ~ .input-status-bar {
    background-color: #50B5FF;
  }
  input.invalid ~ .input-status-bar {
    background-color: #FC5A5A;
  }
}
</style>
