import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState({
    key: process.env.SECRET_LOCAL_KEY,
    paths: ['user']
  })
]
