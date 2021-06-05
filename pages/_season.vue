<template lang="pug">
<div>
    h2.green.table-title {{ league.season }}/{{ (league.season + 1).toString().substring(2) }} {{ league.name }} Table
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
    async asyncData({ $axios, env, params }) {
        const data = await $axios.$get(
            `https://v3.football.api-sports.io/standings?league=39&season=${params.season}`,
            {
                headers: {
                    'x-apisports-key': env.API_FOOTBALL_KEY,
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
}
</script>

<style lang="scss" scoped>
.table-title {
    text-transform: uppercase;
    margin-bottom: 20px;
    font-weight: 100;
    font-size: 22px;
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
