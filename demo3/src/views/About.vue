<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { toRefs } from 'vue'
export default {
  name: 'About',
  setup() {
    const store = useStore()
    // const name = store.state.name
    const { name } = toRefs(store.state)
    const handleClick = () => {
      store.commit('changeName', 'hello')
    }
    return {
      name, handleClick
    }
  }
}
</script>
