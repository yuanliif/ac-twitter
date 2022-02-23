// 當使用者沒有暱稱時，用帳號作為顯示上使用
export const emptyNameMethod = {
  methods: {
    emptyName (name, account) {
      return name || account
    }
  }
}
