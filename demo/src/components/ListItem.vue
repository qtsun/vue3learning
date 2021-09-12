<template>
    <li>{{msg}}</li>
</template>

<script>
    export default {
       name: "ListItem",
       props: {
           msg: {
               type: String,
               default: ''
           },
       },
    }
</script>

<style lang="scss" scoped>

</style>