<script>
export default {
    middleware: [
        function ({ redirect }) {
            redirect(`/news`)
        },
    ],
}
</script>
