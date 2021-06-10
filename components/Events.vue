<template lang="pug">
    ul.white
        li(v-for="goal in goals") {{ goal.player.name }} {{ goal.detail === `Penalty` ? `pen` : `` }} {{ goal.time.elapsed }}
</template>

<script>
export default {
    props: {
        fixtureID: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            goals: [],
        }
    },
    async fetch() {
        console.log('here')
        const data = await this.$axios.$get(
            `https://v3.football.api-sports.io/fixtures/events?fixture=${this.fixtureID}`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )
        this.goals = await data.response.filter((e) => e.type === `Goal`)
    },
}
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
    text-transform: initial
</style>
