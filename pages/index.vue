<template lang="pug">
<div>
    h2.green.table-title Euro 2020 Results/Fixture
    p(v-if="fixtures.length === 0") No fixtures today... or i've run out of API requests :(
    table(v-if="fixtures.length >= 0")
        tbody
            fixture(v-for="f in fixtures" :fixture="f" :key="f.fixture.id")
</div>
</template>

<script>
import dayjs from 'dayjs'

import Fixture from '@/components/Fixture.vue'

export default {
    components: {
        Fixture,
    },
    data() {
        return {
            fixtures: [],
        }
    },
    created() {
        this.getFixtures()
    },
    methods: {
        async getFixtures() {
            const data = await this.$axios.$get(
                `https://v3.football.api-sports.io/fixtures?date=${dayjs().format(
                    'YYYY-MM-DD'
                )}&league=4&season=2020`,
                {
                    headers: {
                        'x-apisports-key':
                            process.env.NUXT_ENV_API_FOOTBALL_KEY,
                    },
                }
            )

            this.fixtures = await data.response
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

table
    width: 100%
</style>
