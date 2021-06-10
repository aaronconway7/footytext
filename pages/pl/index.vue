<script>
export default {
    middleware: [
        function ({ redirect }) {
            const year = new Date().getFullYear()
            redirect(`pl/${year - 1}`)
        },
    ],
}
</script>
