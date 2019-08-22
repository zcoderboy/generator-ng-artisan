const fs = require("fs")
const exec = require('child_process').exec;
const chalk = require('chalk');

const { renderString } = require('template-file')
const { env } = require('./env')

function createEnv(data, name) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./${name}/.env`, renderString(env, data), (err) => {
            if (err) {
                reject(err.message)
            } else {
                resolve()
            }
        })
    })
}

async function generateLaravelApp(name) {
    return new Promise((resolve, reject) => {
        exec(`(git clone https://github.com/Samba24/laravel-basic-rest.git ${name})`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${stdout}`)
                } else {
                    resolve(true)
                }
            }
        )
    })
}

async function doComposerInstall(name, database) {
    return new Promise((resolve, reject) => {
        exec(`(cd ${name} && composer install && php artisan make:database ${database} && php artisan migrate && php artisan db:seed)`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${stdout}`)
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
                    reject(`${stdout}`)
                } else {
                    resolve()
                }
            }
        )
    })
}

module.exports = { createEnv, generateLaravelApp, generateAngularApp, doComposerInstall }