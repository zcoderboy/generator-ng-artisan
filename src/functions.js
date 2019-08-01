const fs = require("fs")
const exec = require('child_process').exec;

const { renderString } = require('template-file')
const { env } = require('./env')

function createEnv(data, name) {
    fs.writeFile(`./${name}/.env`, renderString(env, data), function(err) {
        err ? console.error('Unable to write env variables') : console.log('Laravel environment variables set')
    })
}

async function generateLaravelApp(name, database) {
    return new Promise((resolve, reject) => {
        exec(`(git clone https://github.com/Samba24/laravel-basic-rest.git ${name} && cd ${name} && composer install && php artisan make:database ${database} && php artisan migrate && php artisan db:seed)`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${error}`)
                } else {
                    resolve()
                }
            }
        )
    })
}

async function generateAngularApp(name) {
    return new Promise((resolve, reject) => {
        exec(`(git clone https://github.com/Samba24/angular-basic-crud.git ${name} && cd ${name} && npm install)`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${error}`)
                } else {
                    resolve()
                }
            }
        )
    })
}

module.exports = { createEnv, generateLaravelApp, generateAngularApp }