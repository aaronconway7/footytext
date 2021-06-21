<template lang="pug">
<div>
    h2.green.table-title {{ name }} Table
        select.season-select.blackbg.green(name="season" @change="handleSeasonSelect")
            option(v-for="s in seasons" :value="s" :selected="season === s") {{ getSeasonString(s) }}
    p(v-if="standings.length === 0") We've run out of daily API requests :(
    table(v-else)
        thead
            tr
                td
                td
                td P
                td W
                td D
                td L
                td F
                td A
                td GD
                td PTS
        tbody
            tr(v-for="s in standings" :key="s.team.id" :class="{ cyan: s.rank % 2 === 0 }")
                td #[span.green {{ seasonFinished && s.rank === 1 ? `C` : `` }}] {{ s.rank }}
                td.team-name {{ s.team.name }}
                td {{ s.all.played }}
                td {{ s.all.win }}
                td {{ s.all.draw }}
                td {{ s.all.lose }}
                td {{ s.all.goals.for }}
                td {{ s.all.goals.against }}
                td {{ s.goalsDiff }}
                td {{ s.points }}
    
    p.champions.green(v-if="seasonFinished") {{ champions.team.name }} are the Premier League Champions {{ getSeasonString(this.season) }}
</div>
</template>

<script>
import range from 'lodash/range'

export default {
    data() {
        return {
            seasons: range(1992, new Date().getFullYear()),
            name: `Premier League`,
            season: Number(this.$route.params.season),
        }
    },
    async asyncData({ params, $http }) {
        const standings = await $http.$get(
            `/data/pl/standings/${params.season}.json`
        )

        return { standings }
    },
    methods: {
        handleSeasonSelect(e) {
            this.$router.push(e.target.value)
        },
        getSeasonString(year) {
            return `${year}/${(year + 1).toString().substring(2)}`
        },
    },
    computed: {
        champions() {
            return this.standings.find((t) => t.rank === 1)
        },
        seasonFinished() {
            const maxPlayed = (this.standings.length - 1) * 2

            if (this.standings[0].all.played === maxPlayed) return true
            return false
        },
    },
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

.season-select
    font-family: inherit
    margin-left: 1em
    border: none
    cursor: pointer

table
    thead
        td
            padding-bottom: 20px
            text-align: center

    td
        padding: 2px 8px

    tbody
        td
            &:not(.team-name)
                text-align: right

.champions
    text-transform: uppercase
    margin: 2em 0 1em 0
    text-align: center
    white-space: initial
    line-height: 1.5em
</style>
