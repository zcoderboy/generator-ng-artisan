const laravelQuestions = [{
        type: "input",
        name: "name",
        message: "\t Name ->"
    },
    {
        type: "input",
        name: "host",
        message: "\t Database host (localhost) ->"
    },
    {
        type: "input",
        name: "database",
        message: "\t Database name ->"
    },
    {
        type: "input",
        name: "username",
        message: "\t Database user (root) ->"
    },
    {
        type: "input",
        name: "password",
        message: "\t Database password->"
    }
];

const angularQuestions = [{
        type: "input",
        name: "projectName",
        message: "\t Name ->"
    },
    {
        type: "input",
        name: "projectLocation",
        message: "\t Location (i.e 'C://something/here') ->"
    }
];

module.exports = { laravelQuestions, angularQuestions }