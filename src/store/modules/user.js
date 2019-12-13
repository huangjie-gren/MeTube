import { reg, update, login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  username: '',
  nickname: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user reg
  reg({ commit }, userInfo) {
    const { username, nickname, password } = userInfo
    return new Promise((resolve, reject) => {
      reg({ username: username.trim(), nickname: nickname, password: password }).then(response => {
        const { data } = response
        console.log(data)
        // const { nickname } = data
        // commit('SET_NICKNAME', nickname)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user update
  update({ commit }, userInfo) {
    const { username, nickname, oldpassword, newpassword } = userInfo
    return new Promise((resolve, reject) => {
      update({ username: username.trim(), nickname: nickname, oldpassword: oldpassword, newpassword: newpassword }).then(response => {
        const { data } = response
        const { nickname } = data
        commit('SET_NICKNAME', nickname)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data)

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { username, nickname, avatar } = data
        console.log(username)
        commit('SET_USERNAME', username)
        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_AVATAR', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

