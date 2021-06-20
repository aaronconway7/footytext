<script>
export default {
    middleware: [
        function ({ redirect, $dayjs }) {
            const year = $dayjs().format(`YYYY`)
            redirect(`/pl/${Number(year) - 1}`)
        },
    ],
}
</script>
