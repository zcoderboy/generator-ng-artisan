const commander = require("commander");
const { prompt } = require("inquirer");
const exec = require('child_process').exec;
const chalk = require('chalk');
const { laravelQuestions, angularQuestions } = require('./src/questions');
const { envDataLaravel } = require('./src/placeholders')
const func = require('./src/functions')
const ora = require('ora')

commander.version('1.0.0').description('ng-artisan cli')
commander
    .command('ng-artisan new')
    .alias('nga')
    .description('Create new ng-artisan scaffold')
    .action(() => {
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
                    });
                    //Generating Angular project
                    let mythrobber = ora({
                        text: 'Generating Angular project...'
                    }).start()
                    func.generateAngularApp(angularAnswers.name).then(() => {
                        mythrobber.stopAndPersist({
                            symbol: '✅ ',
                            text: 'Angular project generated with a status code of 200'
                        });
                        exec(`cd ${laravelAnswers.name} && php artisan migrate && php artisan db:seed`, (stderr) => {
                            if (stderr) {
                                console.error(stderr);
                            } else {
                                console.log("\nYour projects were successfully generated.\nRun php artisan serve on your Laravel project to get your server up and running.\nRun ng serve on your Angular project to start your server.\nAngular HTTP requests are made on the following URL : http://localhost:8000/api. You can change it in the env file.\nHappy hacking!")
                            }
                        });
                    }).catch((error) => {
                        mythrobber.stopAndPersist({
                            symbol: '❌ ',
                            text: 'ERROR'
                        })
                        console.log(chalk.bold.red(error))
                    })

                }).catch((error) => {
                    throbber.stopAndPersist({
                        symbol: '❌ ',
                        text: 'ERROR'
                    });
                    console.log(chalk.bold.red(error))
                });
            })

        })
    })

commander.parse(process.argv);