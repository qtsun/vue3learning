<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 @click="handleClick">This is an home page</h1>
    <h1>{{name}}</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { toRefs } from 'vue'
export default {
  name: 'Home',
  setup() {
    const store = useStore()
    // const name = store.state.name
    const { name } = toRefs(store.state)
    const handleClick = () => {
      store.dispatch('getData')
    }
    return {
      name, handleClick
    }
  }
}
</script>
