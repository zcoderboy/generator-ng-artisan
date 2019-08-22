# ng-artisan
This is an Angular/Laravel app scaffolding tool with API and CRUD operations already set up.

![Image](./images/angular-icon.svg) ![Image](./images/Logomark.svg)

## Getting Started

These instructions will help you install the CLI on your local machine.

### Prerequisites

To use this generator, make sure you already installed Node JS, PHP and Composer on your machine.<br>
You can get a fresh copy of Node and Composer using this links below<br>
https://nodejs.org\
https://getcomposer.org

### Installing

To start using the generator you have to install the package globally using Node with this command<br>

```
npm i -g generator-ng-artisan
```

## Usage

ng-artisan only have one command (for now) that is actually doing a lot for you.<br>
To generate your projects, grab a command line and type in the command below

```
nga new
```
Here is a list of what the command do
*  Creates a new Laravel project with the name supplied.
*  Creates a new database with the given name and seed it with random datas.
*  Sets up a basic CRUD on the datas and expose them as an API.
*  Creates an Angular app that consumes the API. You will be able to add, remove, update and delete randoms.

Also make sure your local database server and application server are up and running before executing the command.

## API endpoints
api/randoms            : To get all randoms<br>
api/random/add         : To add a new random<br>
api/random/delete/{id} : To delete a random<br>
api/random/update/{id} : To update a random<br>


## Contributing

To contribute to this project just make a pull request and I will be glad to have you on board.

## Authors

* **Samba Ndiaye**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* Thanks to anyone who helped me somehow on this project.
* Hat tip to anyone whose code was used.

