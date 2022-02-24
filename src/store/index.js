import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '@/apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      cover: '',
      avatar: '',
      rolo: '',
      introduction: '',
      follower: -1,
      following: -1
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }

      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, account, name, email, cover, avatar, rolo, introduction, follower, following } = data

        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          cover,
          avatar,
          rolo,
          introduction,
          follower,
          following
        })
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
