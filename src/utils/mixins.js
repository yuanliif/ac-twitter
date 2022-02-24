import moment from 'moment'

// 當使用者沒有暱稱時，用帳號作為顯示上使用
export const emptyNameMethod = {
  methods: {
    emptyName (name, account) {
      return name || account
    }
  }
}

// 檢查資料型態
function typeCheck ({ input, typeRef }) {
  const result = {
    status: true,
    message: ''
  }

  if (typeof input !== typeof typeRef) {
    result.status = false
    result.message = '資料型態錯誤'
  }

  return result
}

// 檢查輸入字串的長度
function lengthCheck ({ input, min = -1, max = -1 }) {
  const result = {
    status: true,
    message: ''
  }

  if (min !== -1) {
    if (input.length < min) {
      result.status = false
      result.message = '字數過短'
      return result
    }
  }

  if (max !== -1) {
    if (input.length > max) {
      result.status = false
      result.message = '字數超出上限'
      return result
    }
  }

  return result
}

// 表單輸入驗證方法
export const inputValidationMethod = {
  methods: {
    // 帳號規則：1-20字英數
    checkAccount (account) {
      let result

      result = typeCheck({ input: account, typeRef: '' })
      if (result.status === false) {
        return result
      }

      result = lengthCheck({ input: account, min: 1, max: 20 })
      if (result.status === false) {
        return result
      }

      result = regexCheck({ input: account, regex: /^[a-zA-Z0-9]{1,20}$/ })

      return result
    },
    // 名稱規則：不超過50字（頭尾去白）
    checkName (name) {
      let result

      result = typeCheck({ input: name, typeRef: '' })
      if (result.status === false) {
        return result
      }

      result = lengthCheck({ input: name, max: 50 })
      if (result.status === false) {
        return result
      }

      return result
    },
    checkEmail (email) {
      let result

      result = typeCheck({ input: email, typeRef: '' })
      if (result.status === false) {
        return result
      }

      // Email的正則表示：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation
      result = regexCheck({
        input: email,
        regex:
          /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      })

      return result
    },
    // 密碼規則：5-20字英數
    checkPassword (password) {
      let result

      result = typeCheck({ input: password, typeRef: '' })
      if (result.status === false) {
        return result
      }

      result = lengthCheck({ input: password, min: 5, max: 20 })
      if (result.status === false) {
        return result
      }

      result = regexCheck({ input: password, regex: /^[a-zA-Z0-9]{5,20}$/ })

      return result
    }
  }
}

// 用正則表達式檢查
function regexCheck ({ input, regex }) {
  const result = {
    status: true,
    message: ''
  }

  const re = new RegExp(regex)
  result.status = re.test(input)

  if (result.status === false) {
    result.message = '輸入格式錯誤'
  }

  return result
}

// 轉換並且計算時間
export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}
