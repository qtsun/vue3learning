import { createStore } from 'vuex'

export default createStore({
  state: {
    name: 'dell'
  },
  // mutation 里面只允许写同步代码 不允许写异步代码， 异步逻辑写在 actions 里
  mutations: {
    changeName(state, str) {
      state.name = str
    }
  },
  actions: {
    // 第二步， store感知到你发了一个叫change的action，执行change方法
    getData(store) {
      // 第三步，提交一个 commit 触发一个mutation
      setTimeout(() => {
        store.commit('changeName', 'hello')
      }, 2000);
    }
  },
  modules: {
  }
})
