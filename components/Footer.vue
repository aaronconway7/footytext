<template lang="pug">
    footer
        div.strip.bluebg
            p.yellow Created by #[a(href="https://aaronconway.co.uk" target="_blank") Aaron Conway]
        ul
            li.red
                NuxtLink(to="/") Euro 2020
            li.green
                NuxtLink(to="/pl/1992") Premier League
            li.yellow Top Sport
            li.blue Sport
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
