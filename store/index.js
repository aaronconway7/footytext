export const state = () => ({
    dailyRequestsRemaining: 100,
})

export const mutations = {
    setDailyRequestsRemaining(state, value) {
        state.dailyRequestsRemaining = value
    },
}

export const actions = {
    async getDailyRequestsRemaining({ commit }) {
        const data = await this.$http.$get(
            `https://v3.football.api-sports.io/status`,
            {
                headers: {
                    'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
                },
            }
        )
        const requests = await data.response.requests.current
        const remaining = requests > 100 ? 0 : 100 - requests
        commit(`setDailyRequestsRemaining`, remaining)
    },
}
