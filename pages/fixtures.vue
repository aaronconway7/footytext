<template lang="pug">
<div>
    h2.green.table-title Fixtures
        input(type="date" name="date" v-model="date").blackbg.green
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error :(
    .grid(v-else)
        //- p(v-if="dailyRequestsRemaining === 0") We've run out of daily API requests :(
        p(v-if="fixtures.length === 0") No fixtures {{ isToday ? `today` : `on selected date` }}...
        table(v-else v-for="competition in Object.keys(groupedFixturesByCompetition)" :key="competition")
            thead
                th {{ competition }}
            tbody
                Fixture(v-for="f in groupedFixturesByCompetition[competition]" :fixture="f" :key="f.id")
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
        orderdFixtures() {
            return this.fixtures.sort((a, b) =>
                this.$dayjs(a.fixture.date).isAfter(this.$dayjs(b.fixture.date))
                    ? 1
                    : -1
            )
        },
        groupedFixturesByCompetition() {
            return Object.groupBy(
                this.fixtures,
                ({ competition }) => competition.name
            )
        },
    },
    async fetch() {
        // Premier League = 39
        const data = await this.$http.$get(
            `https://api.football-data.org/v4/matches?date=${this.date}`,
            {
                headers: {
                    'X-Auth-Token': process.env.NUXT_ENV_FOOTBALL_DATA_API_KEY,
                },
            }
        )
        this.$store.dispatch(`getDailyRequestsRemaining`)
        this.fixtures = await data.matches
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

.grid
    display: grid
    grid-gap: 20px
</style>
