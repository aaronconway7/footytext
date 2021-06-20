<template lang="pug">
    div
        ul.white
            li(v-for="goal in goals") {{ goal.player.name }} {{ detailLookup[goal.detail] }} {{ goal.time.elapsed }}
        ul.red.sent-off(v-if="sendingOffs.length > 0")
            li Sent off:
            li(v-for="sendingOff in sendingOffs") {{ sendingOff.player.name }} {{ sendingOff.time.elapsed }}
</template>

<script>
export default {
    props: { events: { type: Array } },
    data() {
        return {
            detailLookup: {
                Penalty: `pen`,
                'Own Goal': `og`,
            },
            validSendingOff: [`Second Yellow Card`, `Red Card`],
        }
    },
    computed: {
        goals() {
            return this.events.filter(
                (e) => e.type === `Goal` && e.detail !== `Missed Penalty`
            )
        },
        sendingOffs() {
            return this.events.filter(
                (e) =>
                    e.type === `Card` && this.validSendingOff.includes(e.detail)
            )
        },
    },
}
</script>

<style lang="sass" scoped>
ul
    list-style-type: none
    text-transform: initial

    &.sent-off
        margin-top: 1em
</style>
