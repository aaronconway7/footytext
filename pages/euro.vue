<template lang="pug">
<div>
    h2.green.table-title Euro 2020 Results/Fixtures
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error :(
    div(v-else)
        p(v-if="dailyRequestsRemaining === 0") We've run out of daily API requests :(
        p(v-else-if="fixtures.length === 0") No fixtures today...
        table(v-else)
            tbody
                Fixture(v-for="f in fixtures" :fixture="f" :key="f.fixture.id")
</div>
</template>

<script>
export default {
    data() {
        return {
            fixtures: [],
        }
    },
    computed: {
        dailyRequestsRemaining() {
            return this.$store.state.dailyRequestsRemaining
        },
    },
    async fetch() {
        // Get Euro 2020 Fixtures
        const data = await this.$http.$get(
            `https://v3.football.api-sports.io/fixtures?date=${this.$dayjs().format(
                'YYYY-MM-DD'
            )}&league=4&season=2020`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )
        this.$store.dispatch(`getDailyRequestsRemaining`)
        this.fixtures = await data.response
    },
    fetchOnServer: false,
}
</script>

<style lang="sass" scoped>
.table-title,
.season-select
    font-weight: 100
    font-size: 24px
    letter-spacing: 2px

.table-title
    text-transform: uppercase
    margin-bottom: 20px

table
    width: 100%
</style>
