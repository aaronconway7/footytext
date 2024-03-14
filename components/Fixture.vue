<template lang="pug">
    tr
        td.cyan.team-name {{ fixture.homeTeam.shortName }}
            //- TeamEvents(:events="homeEvents")
        td {{ Number.isInteger(fixture.score.fullTime.home) && Number.isInteger(fixture.score.fullTime.away) ? `${fixture.score.fullTime.home}-${fixture.score.fullTime.away}` : `v` }}
        td.cyan.team-name {{ fixture.awayTeam.shortName }}
            //- TeamEvents(:events="awayEvents")
        td.status {{ fixture.status === `FINISHED` ? `FT` : getKickOffTime(fixture.utcDate) }}
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
        // const data = await this.$http.$get(
        //     `https://api.football-data.org/v4/matches/${this.fixture.id}`,
        //     {
        //         headers: {
        //             'X-Auth-Token': process.env.NUXT_ENV_FOOTBALL_DATA_API_KEY,
        //         },
        //     }
        // )
        // console.log('data', data)
        // this.events = data.response
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
