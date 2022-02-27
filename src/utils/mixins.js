import moment from 'moment'
// 設定moment語系
moment.locale('zh-tw')

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
      result = regexCheck({ input: email, regex: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })

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
    },
    // 推文規則：長度不超過140
    checkTweet (tweet) {
      let result

      result = typeCheck({ input: tweet, typeRef: '' })
      if (result.status === false) {
        return result
      }

      result = lengthCheck({ input: tweet, min: 1, max: 140 })
      return result
    }
  }
}

// 給帳號顯示增加@的前綴
export const addPrefixFilter = {
  filters: {
    addPrefix (account) {
      return `@${account}`
    }
  }
}

/*
  數字格式化顯示
  1. 單位做到支援Number.MAX_SAFE_INTEGER就好了，超過就直接顯示了
  2. 數字每跨4位數字就換一次單位
  3. 最多顯示一位小數
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
  https://googology.fandom.com/zh/wiki/%E4%B8%AD%E6%96%87%E6%95%B8%E5%AD%97?variant=zh-tw
*/
const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
export const numberFormatFilter = {
  filters: {
    numberFormat (number) {
      if (number > Number.MAX_SAFE_INTEGER) {
        return `${number}`
      }

      const postfix = ['', '萬', '億', '京']
      let index = 0

      while (number >= 10000) {
        number /= 10000
        index += 1
      }

      const numberPart = formatter.format(number)

      return `${numberPart}${postfix[index]}`
    }
  }
}

// 檢查時間是否與當前時間差距24小時以上
function checkTimeDiff (momentTime) {
  const now = moment()

  return (now.diff(momentTime, 'h') >= 24)
}

// 檢查時間是否與當前時間在同一年內
function inThisYear (momentTime) {
  const now = moment()

  return (now.isSame(momentTime, 'year'))
}

export const timeFormatFilter = {
  filters: {
    timeFormat (datetime) {
      if (!datetime) {
        return ''
      }

      const momentTime = moment(datetime)

      if (momentTime.isValid() === false) {
        return ''
      }

      if (checkTimeDiff(momentTime)) {
        if (inThisYear(momentTime)) {
          // 顯示X月Y日
          return momentTime.format('MoDo')
        } else {
          // 顯示X年Y月Z日
          return momentTime.format('ll')
        }
      } else {
        // 顯示多久前
        return momentTime.fromNow()
      }
    }
  }
}
