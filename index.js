#!/usr/bin/env node

const commander = require("commander");
const { prompt } = require("inquirer");
const exec = require('child_process').exec;
const chalk = require('chalk');
const { laravelQuestions, angularQuestions } = require('./src/questions');
const { envDataLaravel } = require('./src/placeholders')
const func = require('./src/functions')
const ora = require('ora')

commander.version('1.0.0').description('A scaffolding tool for Angular-Laravel projects')
commander
    .command('new')
    .description('This command generates a Laravel API and an Angular app with CRUD already set up .')
    .action((action) => {
        console.log(chalk.bold.green('Enter Laravel project informations..'))
        prompt(laravelQuestions).then(laravelAnswers => {
            console.log(chalk.bold.green('Enter Angular project informations..'))
            prompt(angularQuestions).then(angularAnswers => {
                let throbber = ora({
                    text: 'Hold on we are generating your projects...\n'
                }).start()
                func.generateLaravelApp(laravelAnswers.name)
                    .then(() => {
                        //Setting and creating Laravel environment variables once project is created
                        envDataLaravel.name = laravelAnswers.name
                        envDataLaravel.database = laravelAnswers.database
                        envDataLaravel.host = laravelAnswers.host
                        envDataLaravel.password = laravelAnswers.password
                        return func.createEnv(envDataLaravel, laravelAnswers.name)
                    }).then(() => {
                        //Installing Laravel required packages, creating the database and seeding it
                        return func.doComposerInstall(laravelAnswers.name, laravelAnswers.database)
                    }).then(() => {
                        //Generating Angular app
                        return func.generateAngularApp(angularAnswers.name)
                    }).then(() => {
                        //Success message if everything went right
                        throbber.stopAndPersist({
                            symbol: '✅ ',
                            text: 'Your projects were successfully generated. Happy hacking!'
                        });
                    }).catch((err) => {
                        throbber.stop();
                        console.log(chalk.bold.red(err))
                    })
            })

        })

    })

commander.parse(process.argv);