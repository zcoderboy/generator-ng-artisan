const fs = require("fs");
const commander = require("commander");
const { prompt } = require("inquirer");
const util = require('util')
const chalk = require('chalk');
const { laravelQuestions, angularQuestions } = require('./questions');
const { renderTemplateFile } = require('template-file');
const { envDataAngular, envDataLaravel } = require('./src/placeholders')
const func = require('./src/functions')
const ora = require('ora')

commander.version('1.0.0').description('ng-artisan cli')
commander
    .command('ng-artisan new')
    .alias('nga')
    .description('Create new ng-artisan scaffold')
    .action(() => {
        if (fs.existsSync("C:/xampp/htdocs") || fs.existsSync("/opt/lampp/htdocs")) {
            console.log(chalk.bold.green('Enter Laravel project informations..'))
            prompt(laravelQuestions).then(laravelAnswers => {
                console.log(chalk.bold.green('Enter Angular project informations..'))
                prompt(angularQuestions).then(angularAnswers => {
                    //Generating Laravel project
                    let throbber = ora({
                        text: 'Generating Laravel project...'
                    }).start()
                    func.generateLaravelApp(laravelAnswers.name, laravelAnswers.database).then(() => {
                        //Setting Laravel environment variables once project is created
                        envDataLaravel.name = laravelAnswers.name
                        envDataLaravel.database = laravelAnswers.database
                        envDataLaravel.host = laravelAnswers.host
                        envDataLaravel.password = laravelAnswers.password
                        func.createEnv(envDataLaravel, laravelAnswers.name)
                        throbber.stopAndPersist({
                            symbol: '✅ ',
                            text: 'Laravel project generated with a status code of 200'
                        })
                    }).catch((error) => {
                        throbber.stopAndPersist({
                            symbol: '❌ ',
                            text: 'ERROR'
                        })
                        console.log(chalk.bold.red(error))
                    });

                    //Generating Angular project
                    let mythrobber = ora({
                        text: 'Generating Angular project...'
                    }).start()

                    func.generateAngularApp(angularAnswers.name).then(() => {
                        mythrobber.stopAndPersist({
                            symbol: '✅ ',
                            text: 'Angular project generated with a status code of 200'
                        })
                    }).catch((error) => {
                        mythrobber.stopAndPersist({
                            symbol: '❌ ',
                            text: 'ERROR'
                        })
                        console.log(chalk.bold.red(error))
                    })
                })

            })
        } else {
            console.error("Unable to find htdocs default location");
        }
    })

commander.parse(process.argv);