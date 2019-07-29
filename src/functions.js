const fs = require("fs")
const spawn = require('child_process').spawn;

const { renderString } = require('template-file')
const { env } = require('./env')

function createEnv(data, name) {
    fs.writeFile(`C://xampp/htdocs/${name}/.env`, renderString(env, data), function(err) {
        err ? console.error('Unable to write env variables') : console.log('Laravel environment variables set')
    })
}

async function generateLaravelApp(name) {
    return new Promise((resolve, reject) => {
        let child = spawn('cmd', ['/c', `cd C:/xampp/htdocs && composer create-project --prefer-dist laravel/laravel ${name}`], { stdio: 'inherit' })
        child.on('close', (code) => {
            if (code !== 0)
                console.error(`Laravel project creation failed with code : ${code}`)
            else
                console.info(`Laravel project creation failed with code : ${code}`)
            resolve()
        })
    })
}
module.exports = { createEnv, generateLaravelApp }