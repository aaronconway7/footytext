<script>
export default {
    middleware: [
        function ({ redirect }) {
            const year = new Date().getFullYear()
            redirect(`/${year - 1}`)
        },
    ],
}
</script>
