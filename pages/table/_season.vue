<template lang="pug">
<div>
    h2.green.table-title {{ name }} Table
        select.season-select.blackbg.green(name="season" @change="handleSeasonSelect")
            option(v-for="s in seasons" :value="s" :selected="season === s") {{ getSeasonString(s) }}
    table(v-if='standings.length > 0')
        thead
            tr
                th(v-for="(cell, cellIndex) in standings[0]" :key="cellIndex") {{ cellIndex < 2 ? "" : cellIndex === 2 ? 'P' : cell }}
        tbody
            tr(v-for="(row, rowIndex) in standings.slice(1)" :key="rowIndex" :class="{ cyan: rowIndex % 2 === 0 }")
                td(v-for="(cell, cellIndex) in row" v-if="cellIndex !== 1" :key="cellIndex" :class="{ green: rowIndex === 0, 'team-name': cellIndex === 2 }") {{ cell }}
    
    p.champions.green(v-if="seasonFinished") {{ champions }} are the Premier League Champions {{ getSeasonString(this.season) }}
</div>
</template>

<script>
import range from 'lodash/range'
import { load } from 'cheerio'

export default {
    data() {
        return {
            seasons: range(1992, new Date().getFullYear()),
            name: `Premier League`,
            season: Number(this.$route.params.season),
        }
    },
    async asyncData({ params, $http }) {
        let standings = []

        const url = `https://www.transfermarkt.co.uk/premier-league/tabelle/wettbewerb/GB1?saison_id=${params.season}`
        const data = await $http.$get(url)
        const $ = load(data)

        const rows = $('.items tr')
        rows.each((i, row) => {
            const columns = $(row).find('td, th')
            const data = columns
                .map((i, column) => $(column).text().trim())
                .get()
            standings.push(data)
        })

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
        fistTeamData() {
            return this.standings[1]
        },
        champions() {
            return this.fistTeamData[2]
        },
        seasonFinished() {
            // minus 2 to account for heading and you can't play yourselves
            const maxPlayed = (this.standings.length - 2) * 2

            if (Number(this.fistTeamData[3]) === maxPlayed) return true
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
        th
            padding-bottom: 20px
            text-align: center

    td,
    th
        padding: 2px 8px
        text-align: left

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
