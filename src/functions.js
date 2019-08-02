const fs = require("fs")
const exec = require('child_process').exec;
const chalk = require('chalk');

const { renderString } = require('template-file')
const { env } = require('./env')

function createEnv(data, name) {
    fs.writeFile(`./${name}/.env`, renderString(env, data), function(err) {
        err ? console.error(chalk.bold.red('\nUnable to write env variables')) : ''
    })
}

async function generateLaravelApp(name, database) {
    return new Promise((resolve, reject) => {
        exec(`(git clone https://github.com/Samba24/laravel-basic-rest.git ${name} && cd ${name} && composer install && php artisan make:database ${database})`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(`${stderr}`)
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