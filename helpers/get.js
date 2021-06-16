const fs = require('fs')
const fetch = require('node-fetch')

const seasons = process.argv.slice(2)

seasons.forEach(async (s) => {
    const response = await fetch(
        `https://v3.football.api-sports.io/standings?league=39&season=${s}`,
        {
            headers: {
                'x-apisports-key': process.env.NUXT_ENV_API_FOOTBALL_KEY,
            },
        }
    )
    const data = await response.json()
    const standings = await data.response[0].league.standings[0]
    const json = JSON.stringify(standings)

    fs.writeFile(`${s}.json`, json, 'utf8', () =>
        console.log(`✅ Got ${s} PL standings!`)
    )
})
