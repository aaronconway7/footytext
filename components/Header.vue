<template lang="pug">
    header
        div.bar
            span.white P100
            span.white CEEFAX 1
            span.white 324
            span.white {{ date }}
            span.yellow {{ time }}4
        div.banner
            div.bbc
                <span>&#xe22a;&#xe203;&#xe213;&#xe22b;&#xe22a;&#xe203;&#xe213;&#xe22b;&#xe22a;&#xe203;&#xe213;&#xe22b;</span>
                <span>&#xe22a;&#xe200;&#xe204;&#xe22b;&#xe22a;&#xe200;&#xe204;&#xe22b;&#xe22a;&#xe200;&#xe207;&#xe22b;</span>
                <span>&#xe202;&#xe203;&#xe203;&#xe203;&#xe202;&#xe203;&#xe203;&#xe203;&#xe202;&#xe203;&#xe203;&#xe203;</span>
            div.football.bluebg
</template>

<script>
import dayjs from 'dayjs'

const dateFormat = `ddd DD MMM YYYY`
const timeFormat = `HH:mm/ss`

export default {
    data() {
        return {
            date: dayjs().format(dateFormat),
            time: dayjs().format(timeFormat),
        }
    },
    methods: {
        getNow() {
            const now = dayjs()
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
}
.bbc {
    display: grid;
}
.football {
    width: 100%;
    height: 46px;
}
</style>
