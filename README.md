# Cosmic Server

> Pithy project description

## Team

  - __Product Owner__: Haoming Huang
  - __Scrum Master__: Laura Curley
  - __Development Team Members__: Kenneth Montgomery

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node 5.8.x
- PostgreSQL 9.5.x
- etc
- etc

## Development

### Installing dependencies
1. Install PostgreSQL following this tutorial (https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql)

### Setting up the Database
From within the root directory:

1. In terminal, *createdb cosmictornado* to create a database
1. In terminal, *nodemon server.js* to start the server and link the tables to the database


## PostgreSQL Command Cheatsheet
- createdb _databasename_ (create a new database called databasename)
- dropdb _databasename_ (delete an existing database)
- psql (enter PostgreSQL command line)
- \list (list all databases)
- \connect (switch databases)
- \dt (show all tables)
- \q (exit psql command line)

- \d _tablename_ (show table column names)
- SELECT * from _tablename_ (show all rows in a table)
- \t (toggle table to show column names if they're not showing up)

## Testing
- In terminal, *mocha* to run tests

### Installing Dependencies



### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

