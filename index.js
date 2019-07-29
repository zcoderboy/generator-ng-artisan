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
                chalk.bold.green('Hold on we are generating your laravel project...');
                //Generating Laravel project
                func.generateLaravelApp(laravelAnswers.name).then(() => {
                        console.log('Generated')
                    })
                    //Setting Laravel environment variables
                envDataLaravel.name = laravelAnswers.name
                envDataLaravel.database = laravelAnswers.database
                envDataLaravel.host = laravelAnswers.host
                envDataLaravel.password = laravelAnswers.password
                func.createEnv(envDataLaravel, laravelAnswers.name)

                // console.log(chalk.bold.green('Enter Angular project informations..'))
                // prompt(angularQuestions).then(angularAnswers => {
                //     exec(`cd ${angularAnswers.projectLocation} && ng new ${angularAnswers.projectName}`, function(error, stdout, stderr) {
                //         console.log(error)
                //         if (stderr) {
                //             console.log(chalk.bold.red('\nERROR -> Unable to create Angular project\nPossible cause is that Angular CLI is not set up'))
                //         } else {
                //             exec()
                //         }
                //     });
                // })
            })
        } else {
            console.error("Unable to find htdocs default location");
        }
    })

commander.parse(process.argv);