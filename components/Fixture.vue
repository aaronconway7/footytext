<template lang="pug">
    tr
        td.cyan.team-name {{ fixture.teams.home.name }}
            ul.white
                li(v-for="goal in homeGoals") {{ goal.player.name }} {{ detailLookup[goal.detail] }} {{ goal.time.elapsed }}
            ul.red.sent-off(v-if="homeSendingOffs.length > 0")
                li Sent off:
                li(v-for="sendingOff in homeSendingOffs") {{ sendingOff.player.name }} {{ sendingOff.time.elapsed }}
        td {{ Number.isInteger(fixture.goals.home) && Number.isInteger(fixture.goals.away) ? `${fixture.goals.home}-${fixture.goals.away}` : `v` }}
        td.cyan.team-name {{ fixture.teams.away.name }}
            ul.white
                li(v-for="goal in awayGoals") {{ goal.player.name }} {{ detailLookup[goal.detail] }} {{ goal.time.elapsed }}
            ul.red.sent-off(v-if="awaySendingOffs.length > 0")
                li Sent off:
                li(v-for="sendingOff in awaySendingOffs") {{ sendingOff.player.name }} {{ sendingOff.time.elapsed }}
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
            detailLookup: {
                Penalty: `pen`,
                'Own Goal': `og`,
            },
            validSendingOff: [`Second Yellow card`, `Red card`],
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
        homeGoals() {
            return this.homeEvents.filter(
                (e) => e.type === `Goal` && e.detail !== `Missed Penalty`
            )
        },
        awayGoals() {
            return this.awayEvents.filter(
                (e) => e.type === `Goal` && e.detail !== `Missed Penalty`
            )
        },
        homeSendingOffs() {
            return this.homeEvents.filter(
                (e) =>
                    e.type === `Card` && this.validSendingOff.includes(e.detail)
            )
        },
        awaySendingOffs() {
            return this.awayEvents.filter(
                (e) =>
                    e.type === `Card` && this.validSendingOff.includes(e.detail)
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

ul
    list-style-type: none
    text-transform: initial

    &.sent-off
        margin-top: 1em
</style>
