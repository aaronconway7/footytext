<template lang="pug">
    tr
        td.cyan.team-name {{ fixture.teams.home.name }}
            ul.white
                li(v-for="goal in homeGoals") {{ goal.player.name }} {{ goal.detail === `Penalty` ? `pen` : `` }} {{ goal.time.elapsed }}
        td {{ Number.isInteger(fixture.goals.home) && Number.isInteger(fixture.goals.away) ? `${fixture.goals.home}-${fixture.goals.away}` : `v` }}
        td.cyan.team-name {{ fixture.teams.away.name }}
            ul.white
                li(v-for="goal in awayGoals") {{ goal.player.name }} {{ goal.detail === `Penalty` ? `pen` : `` }} {{ goal.time.elapsed }}
        td.status {{ fixture.fixture.status.short === `NS` ? getKickOffTime(fixture.fixture.date) : fixture.fixture.status.short }}
</template>

<script>
import dayjs from 'dayjs'

export default {
    props: {
        fixture: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            goals: [],
        }
    },
    computed: {
        homeGoals() {
            return this.goals.filter(
                (g) => g.team.id === this.fixture.teams.home.id
            )
        },
        awayGoals() {
            return this.goals.filter(
                (g) => g.team.id === this.fixture.teams.away.id
            )
        },
    },
    created() {
        this.getGoals()
    },
    methods: {
        getKickOffTime(date) {
            return dayjs(date).format(`HH.mm`)
        },
        async getGoals() {
            const data = await this.$axios.$get(
                `https://v3.football.api-sports.io/fixtures/events?fixture=${this.fixture.fixture.id}`,
                {
                    headers: {
                        'x-apisports-key':
                            process.env.NUXT_ENV_API_FOOTBALL_KEY,
                    },
                }
            )
            this.goals = await data.response.filter((e) => e.type === `Goal`)
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

ul
    list-style-type: none
    text-transform: initial
</style>
