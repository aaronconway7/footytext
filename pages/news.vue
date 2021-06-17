<template lang="pug">
<div>
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error :(
    div(v-else)
        ul
            li.white.headline
                a(:href="mainHeadline.link" target="_blank") {{ mainHeadline.title }}
            li(v-for="(n, i) in subNews" :key="i")
                a(:href="n.link" target="_blank") {{ n.title }}
</div>
</template>

<script>
export default {
    async fetch() {
        const feed = await this.$http.$get(
            `https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/sport/football/rss.xml?edition=uk`
        )

        this.news = feed.items.sort((a, b) =>
            this.$dayjs(a.pubDate).isBefore(this.$dayjs(b.pubDate)) ? 1 : -1
        )
    },
    fetchOnServer: false,
    computed: {
        mainHeadline() {
            return this.news[0]
        },
        subNews() {
            return this.news.slice(1)
        },
    },
}
</script>

<style lang="sass" scoped>
.headline
    text-transform: uppercase
    transform: scaleY(2)
    margin-bottom: 5px

ul
    list-style: none
    line-height: 1.2em

li
    text-overflow: ellipsis
    max-width: 700px
    white-space: nowrap
    overflow: hidden
</style>
