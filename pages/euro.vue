<template lang="pug">
<div>
    h2.green.table-title Euro 2020
        input(type="date" name="date" v-model="date").blackbg.green
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error :(
    div(v-else)
        p(v-if="dailyRequestsRemaining === 0") We've run out of daily API requests :(
        p(v-else-if="fixtures.length === 0") No fixtures {{ isToday ? `today` : `on selected date` }}...
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
            date: this.$dayjs().format(`YYYY-MM-DD`),
        }
    },
    computed: {
        dailyRequestsRemaining() {
            return this.$store.state.dailyRequestsRemaining
        },
        isToday() {
            return this.$dayjs(this.date).isToday()
        },
    },
    async fetch() {
        // Get Euro 2020 Fixtures
        const data = await this.$http.$get(
            `https://v3.football.api-sports.io/fixtures?date=${this.date}&league=4&season=2020`,
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
    watch: {
        date() {
            this.$fetch()
        },
    },
}
</script>

<style lang="sass" scoped>
.table-title,
input[type="date"]
    font-weight: 100
    font-size: 24px
    letter-spacing: 2px

.table-title
    text-transform: uppercase
    margin-bottom: 20px

input[type="date"]
    border: none
    font-family: inherit
    margin-left: 1em
    width: 275px

::-webkit-calendar-picker-indicator
    filter: invert(1)
    transform: translateX(-25px)

table
    width: 100%
</style>
