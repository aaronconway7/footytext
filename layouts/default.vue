<template>
    <div class="teletext">
        <div class="teletext__container">
            <Header />
            <main>
                <Nuxt />
            </main>
            <Footer />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer.vue'

export default {
    components: { Header, Footer },
}
</script>

<style lang="scss">
:root {
    --small-screen: 500px;
}

.teletext__container {
    display: grid;
    grid-auto-rows: max-content;
    grid-gap: 20px;
    margin: auto;
    min-height: 30rem;
    width: max-content;
    min-width: 700px;
}
</style>
