<template lang="pug">
    div.bluebg.container
        h1(v-if="error.statusCode === 404") 404: Page not found
        h1(v-else) An error occurred
</template>

<script>
export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
}
</script>

<style lang="sass" scoped>
.container
    height: 300px
    display: grid
    place-items: center
</style>
