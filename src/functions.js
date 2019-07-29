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
        resolve(spawn('cmd', ['/c', `cd C:/xampp/htdocs && composer create-project --prefer-dist laravel/laravel ${name}`], { stdio: 'inherit' }))
    })
}
module.exports = { createEnv, generateLaravelApp }