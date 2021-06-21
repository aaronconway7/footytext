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
        const requests = data.response.requests.current
        const limit = data.response.requests.limit_day
        const remaining = requests > limit ? 0 : limit - requests
        commit(`setDailyRequestsRemaining`, remaining)
    },
}
