<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1>{{myName}}</h1>
  </div>
</template>
<script>
export default {
  name: 'About',
  computed: {
    myName() {
      return this.$store.state.name 
    }
  },
  methods: {
    handleClick() {
      // 想改变数据， vuex 要求  第一步，必须派发一个action
      this.$store.dispatch('change', 'hello world')
      // 若不包含异步逻辑可以直接出发 mutation
      // this.$store.commit('change')
    }
  },
}
</script>
