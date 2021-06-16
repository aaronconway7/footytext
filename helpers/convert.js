var fs = require('fs')

const files = process.argv.slice(2)

files.forEach((file) => {
    fs.readFile(file, 'utf8', async function readFileCallback(err, data) {
        if (err) {
            console.log(err)
        } else {
            const obj = await JSON.parse(data) //now it an object
            const newObj = await obj.map((team) => ({
                rank: team.rank,
                team: {
                    id: team.rank,
                    name: team.team,
                },
                goalsDiff: team[`goals-dff`],
                points: team.points,
                all: {
                    played: team.played,
                    win: team.wins,
                    draw: team.draws,
                    lose: team.losses,
                    goals: {
                        for: team[`goals-for`],
                        against: team[`goals-against`],
                    },
                },
            }))
            const json = JSON.stringify(newObj) //convert it back to json
            fs.writeFile(file, json, 'utf8', () =>
                console.log(`✅ Converted ${file}!`)
            ) // write it back
        }
    })
})
