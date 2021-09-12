import { createStore } from 'vuex'

export default createStore({
  state: {
    name: 'dell'
  },
  // mutation 里面只允许写同步代码 不允许写异步代码， 异步逻辑写在 actions 里
  mutations: {
    // 第四步 对应的mutation被执行
    change(state, str) {
      // 第五步 在mutation里修改数据
      console.log('mutation')
      this.state.name = str //or state.name = str
    }
  },
  actions: {
    // 第二步， store感知到你发了一个叫change的action，执行change方法
    change(store, str) {
      // 第三步，提交一个 commit 触发一个mutation
      // setTimeout(() => {
      //   this.commit('change')
      // }, 2000);
      this.commit('change', str) //or store.commit('change', str)
    }
  },
  modules: {
  }
})
