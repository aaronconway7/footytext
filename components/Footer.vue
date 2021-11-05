<template lang="pug">
    footer
        div.strip.bluebg
            p.yellow Created by #[a(href="https://aaronconway.co.uk" target="_blank" rel="noopener") Aaron Conway]
        ul
            li.red
                NuxtLink(to="/news") News
            li.green
                NuxtLink(to="/table") Table
            li.yellow
                NuxtLink(to="/fixtures") Fixtures
            li.blue
                a(href="https://www.buymeacoffee.com/aaronconway7" target="_blank" rel="noopener") Donate
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
    display: grid;
    grid-gap: 10px;
}

.strip {
    width: 100%;
    text-transform: uppercase;

    p {
        padding: 4px;
        text-align: center;
        letter-spacing: 2px;
    }
}

ul {
    list-style: none;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
}
</style>
