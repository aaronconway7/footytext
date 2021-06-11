<template lang="pug">
<div>
    h2.green.table-title {{ name }} Table
        select.season-select.blackbg.green(name="season" @change="handleSeasonSelect")
            option(v-for="s in seasons" :value="s" :selected="season === s") {{ s }}/{{ (s + 1).toString().substring(2) }}
    p(v-if="standings.length === 0") I've run out of API requests :(
    table(v-if="standings.length > 0")
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
import range from 'lodash/range'

export default {
    created() {
        this.getStandings()
    },
    data() {
        return {
            seasons: range(1992, new Date().getFullYear()),
            name: `Premier League`,
            season: Number(this.$route.params.season),
            standings: [],
        }
    },
    methods: {
        handleSeasonSelect(e) {
            this.$router.push(e.target.value)
        },
        async getStandings() {
            if (this.season < 2015) {
                const data = await this.$axios.$get(
                    `https://raw.githubusercontent.com/jokecamp/FootballData/master/EPL%201992%20-%202015/tables/epl-${this.season
                        .toString()
                        .substring(2)}-${(this.season + 1)
                        .toString()
                        .substring(2)}.json`
                )

                this.standings = await data.map((team) => ({
                    rank: team.rank,
                    team: {
                        id: team.rank,
                        name: team.team,
                    },
                    goalsDiff: team[`goals-dff`],
                    points: team.points,
                    all: {
                        played: team.played,
                        win: team.wins,
                        draw: team.draws,
                        lose: team.losses,
                        goals: {
                            for: team[`goals-for`],
                            against: team[`goals-against`],
                        },
                    },
                }))
            } else {
                const data = await this.$axios.$get(
                    `https://v3.football.api-sports.io/standings?league=39&season=${this.season}`,
                    {
                        headers: {
                            'x-apisports-key':
                                process.env.NUXT_ENV_API_FOOTBALL_KEY,
                        },
                    }
                )

                this.standings =
                    (await data.response[0]?.league.standings[0]) || []
            }
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
    cursor: pointer;
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
