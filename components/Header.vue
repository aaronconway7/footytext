<template lang="pug">
    header
        div.bar
            span.white.page P{{ $route.params.season || 100 }}
            span.white.daily-requests-remaining CEEFAX {{ dailyRequestsRemaining }}
            span.white AC7
            span.white.date {{ date }}
            span.yellow.time {{ time }}
        div.banner
            div.bbc
                <span>&#xe22a;&#xe203;&#xe213;&#xe22b;&#xe22a;&#xe203;&#xe213;&#xe22b;&#xe22a;&#xe203;&#xe213;&#xe22b;</span>
                <span>&#xe22a;&#xe200;&#xe204;&#xe22b;&#xe22a;&#xe200;&#xe204;&#xe22b;&#xe22a;&#xe200;&#xe207;&#xe22b;</span>
                <span>&#xe202;&#xe203;&#xe203;&#xe203;&#xe202;&#xe203;&#xe203;&#xe203;&#xe202;&#xe203;&#xe203;&#xe203;</span>
            div.title.bluebg
                h1.green FOOTYTEXT
</template>

<script>
const dateFormat = `ddd DD MMM YYYY`
const timeFormat = `HH:mm/ss`

export default {
    data() {
        return {
            date: this.$dayjs().format(dateFormat),
            time: this.$dayjs().format(timeFormat),
        }
    },
    computed: {
        dailyRequestsRemaining() {
            return this.$store.state.dailyRequestsRemaining
        },
    },
    methods: {
        getNow() {
            const now = this.$dayjs()
            this.date = now.format(dateFormat)
            this.time = now.format(timeFormat)
        },
    },
    created() {
        setInterval(this.getNow, 1000)
    },
}
</script>

<style lang="scss" scoped>
header {
    display: grid;
    grid-gap: 10px;
}
.bar {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
}

.banner {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 10px;
    transform: scaleY(1.2);
    transform-origin: top center;
}
.bbc {
    display: grid;
}
.title {
    width: 100%;
    height: 46px;

    h1 {
        margin-top: 14px;
        text-align: center;
        letter-spacing: 12px;
        text-shadow: 2px 5px 0px black;
    }
}
</style>
