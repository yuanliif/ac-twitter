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
      role: '',
      introduction: '',
      follower: -1,
      following: -1
    },
    isAuthenticated: false,
    token: '',
    messageQueue: {
      tweet: {},
      reply: {}
    }
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }

      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    produceTweet (state, tweet) {
      state.messageQueue.tweet = tweet
    },
    consumeTweet (state) {
      state.messageQueue.tweet = {}
    },
    produceReply (state, reply) {
      state.messageQueue.reply = reply
    },
    consumeReply (state) {
      state.messageQueue.reply = {}
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, account, name, email, cover, avatar, role, introduction, follower, following } = data

        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          cover,
          avatar,
          role,
          introduction,
          follower,
          following
        })

        return {
          isAuthenticated: true,
          role
        }
      } catch (error) {
        console.error(error.message)

        return {
          isAuthenticated: false,
          role: ''
        }
      }
    }
  },
  modules: {
  }
})
