<script>
export default {
    middleware: [
        function ({ redirect }) {
            redirect(`/table/${new Date().getFullYear() - 1}`)
        },
    ],
}
</script>
