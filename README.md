# weChallenge

weChallenge, is the social experience web application for people who want to challenge each other at being the best at something.

## Getting Started

Following these instructions will get the weChallenge web application running locally. Please see the deployment notes to get this application running on a live server

### Prerequisities

Below are the things you need to have on your computer

```
Node.js

Postgres

webpack

list additional items below

```
### Installing
Here is a step by step instruction to get weChallenge running locally on your computer

Start the postgres server on your local machine
```
inside terminal:

postgres -D /usr/local/var/postgres/
```

Open up postgres in your terminal
```
inside terminal:

psql
```

Create a new database in postgres called wechallenge
```
inside postgres terminal:

CREATE DATABASE wechallenge
```

Update wechallenge with your postgres username and password
```
inside file wechallenge/server/db/config.js:

  module.exports = {
    username: 'YOUR_USERNAME_FOR_POSTGRES',
    password: 'YOUR_PASSWORD_FOR_POSTGRES',
    secret: 'secretkey'
  }
```

Download all the associated node modules
```
inside terminal:

npm install
```

Run Webpack to compile all the client side files to wechallenge/client/dist/bundle.js
```
inside terminal:

webpack
```

Start the local server
```
inside terminal:

npm start
```

Open web application in web browser
```
inside web browser:

http://localhost:3000/
```

#SHOW SCREEN SHOT OF HOME PAGE WITH NAV BAR ADDRESS


## Running the tests

To run the tests
```
inside terminal:

npm test
```

# SHOW SCREEN SHOT OF RUNNING THE TESTS

## Deployment

```
    The travis.yml file contains continuous integration and deployment
commands for Travis-Ci including creating a PostgreSQL database
during testing and importing an external database file.
```

## Authors

* **Harris Lee** - *Initial work* - [https://github.com/strongharris](https://github.com/strongharris)

* **John Smalley** - *Initial work* - [https://github.com/johnsmalley](https://github.com/johnsmalley)

* **Jim Yang** - *Initial work* - [https://github.com/sourjam](https://github.com/sourjam)

* **Anna Zhao** - *Initial work* - [https://github.com/annatangzhao](https://github.com/annatangzhao)
