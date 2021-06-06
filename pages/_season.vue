<template lang="pug">
<div>
    h2.green.table-title {{ league.name }} Table
        select.season-select.blackbg.green(name="season" @change="handleSeasonSelect")
            option(v-for="season in seasons" :value="season" :selected="$route.params.season === season.toString()") {{ season }}/{{ (season + 1).toString().substring(2) }}
    table
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
                td {{ s.rank }}
                td.team-name {{ s.team.name }}
                td {{ s.all.played }}
                td {{ s.all.win }}
                td {{ s.all.draw }}
                td {{ s.all.lose }}
                td {{ s.all.goals.for }}
                td {{ s.all.goals.against }}
                td {{ s.goalsDiff }}
                td {{ s.points }}
</div>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
        const data = await $axios.$get(
            `https://v3.football.api-sports.io/standings?league=39&season=${params.season}`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )

        const league = await data.response[0].league

        return {
            league: {
                name: league.name,
                season: league.season,
            },
            standings: league.standings[0],
        }
    },
    data() {
        return {
            seasons: [
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                2020,
            ],
        }
    },
    methods: {
        handleSeasonSelect(e) {
            console.log('e', e.target.value)
            this.$router.push(e.target.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.table-title,
.season-select {
    font-weight: 100;
    font-size: 24px;
    letter-spacing: 2px;
}

.table-title {
    text-transform: uppercase;
    margin-bottom: 20px;
}

.season-select {
    font-family: inherit;
    margin-left: 1em;
    border: none;
}

table {
    thead {
        td {
            padding-bottom: 20px;
            text-align: center;
        }
    }

    td {
        padding: 2px 8px;
    }

    tbody {
        td {
            &:not(.team-name) {
                text-align: right;
            }
        }
    }
}
</style>
