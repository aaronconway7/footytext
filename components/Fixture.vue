<template lang="pug">
    tr
        td.cyan.team-name {{ fixture.teams.home.name }}
            TeamEvents(:events="homeEvents")
        td {{ Number.isInteger(fixture.goals.home) && Number.isInteger(fixture.goals.away) ? `${fixture.goals.home}-${fixture.goals.away}` : `v` }}
        td.cyan.team-name {{ fixture.teams.away.name }}
            TeamEvents(:events="awayEvents")
        td.status {{ fixture.fixture.status.short === `NS` ? getKickOffTime(fixture.fixture.date) : fixture.fixture.status.short }}
</template>

<script>
export default {
    props: {
        fixture: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            events: [],
        }
    },
    computed: {
        homeEvents() {
            return this.events.filter(
                (e) => e.team.id === this.fixture.teams.home.id
            )
        },
        awayEvents() {
            return this.events.filter(
                (e) => e.team.id === this.fixture.teams.away.id
            )
        },
    },
    async fetch() {
        const data = await this.$http.$get(
            `https://v3.football.api-sports.io/fixtures/events?fixture=${this.fixture.fixture.id}`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )
        this.events = data.response
    },
    fetchOnServer: false,
    methods: {
        getKickOffTime(date) {
            return this.$dayjs(date).format(`HH.mm`)
        },
    },
}
</script>

<style lang="sass" scoped>
tr
    vertical-align: top

    td
        padding: 10px

        &:first-child
            padding-left: 0px


        &:last-child
            padding-right: 0px

.status
    text-align: right

.team-name
    text-transform: uppercase
</style>
