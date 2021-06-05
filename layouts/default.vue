<template>
    <div class="teletext">
        <div class="teletext__container">
            <Header />
            <main>
                <Nuxt />
            </main>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    components: [Header],
}
</script>

<style>
.teletext__container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: auto;
    min-height: 30rem;
    width: 40rem;
}
</style>
