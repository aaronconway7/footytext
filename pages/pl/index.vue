<script>
export default {
    middleware: [
        function ({ redirect }) {
            const year = this.$dayjs().format(`YYYY`)
            redirect(`/pl/${Number(year) - 1}`)
        },
    ],
}
</script>
