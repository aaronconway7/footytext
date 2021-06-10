<template lang="pug">
<div>
    h2.green.table-title Fixtures
    p(v-if="fixtures.length === 0") No fixtures today... or i've run out of API requests :(
    table(v-if="fixtures.length >= 0")
        tbody
            tr(v-for="f in fixtures" :key="f.fixture.id")
                td {{ f.fixture.id }}
                td.cyan.team-name {{ f.teams.home.name }}
                    Events(v-if="f.league.id === 4 && (f.goals.home > 0 || f.goals.away > 0)" :fixtureID="f.fixture.id")
                td {{ Number.isInteger(f.goals.home) && Number.isInteger(f.goals.away) ? `${f.goals.home}-${f.goals.away}` : `v` }}
                td.cyan.team-name {{ f.teams.away.name }}
                td.status {{ f.fixture.status.short === `NS` ? getKickOffTime(f.fixture.date) : f.fixture.status.short }}
</div>
</template>

<script>
import dayjs from 'dayjs'

import Events from '@/components/Events.vue'

export default {
    components: {
        Events,
    },
    async asyncData({ $axios, params }) {
        const data = await $axios.$get(
            `https://v3.football.api-sports.io/fixtures?date=2021-06-10`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )

        const fixtures = await data.response
        return { fixtures }
    },
    methods: {
        getKickOffTime(date) {
            return dayjs(date).format(`HH.mm`)
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

table {
    width: 100%;

    tr {
        vertical-align: top;
    }

    td {
        padding: 10px;

        &:first-child {
            padding-left: 0px;
        }

        &:last-child {
            padding-right: 0px;
        }
    }
}

.status {
    text-align: right;
}

.team-name {
    text-transform: uppercase;
}
</style>
