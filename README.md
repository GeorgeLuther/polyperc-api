# Polyperc API

[Play with the live app](https://polyperc-app.vercel.app "click here to explore Polyperc")
[View the front end git](https://github.com/GeorgeLuther/polyperc-app)

This is the backend for a web app for generating rhythmic patterns!

## About

Polyperc is a web app for generating and manipulating rhythmic ideas. This API us to keep all rhythmic patterns and their attributes in a postgreSQL database. This is useful because it allows for permanent storage, collaboration, and data manipulation. In future versions there will be users who create projects in which patterns are stored and organized. Then we may even have collaborative projects, tagging and rating systems, and more advanced means of retrieving, filtering, and generating rhythms and projects. The end goal is data which can be used to create new music via machine learning.

## Using the API

### Current functionalities:

- #### GET Hello, world! 
   Sending a git request to the base url should result in a 'Hello, world!' response.

- #### GET all pattern ids:
   /api/patterns?columns=id
   This will result in an array of all pattern ids.

- #### GET all patterns
   /api/patterns
   This will result in an array of all patterns as serialized objects.

- #### POST new template pattern
   /api/patterns
   This will result in a new, untitled pattern being added to the patterns table. The serialize pattern object will be sent in the body.

- #### PUT replacement pattern
   /api/patterns/:id
   This will replace a pattern with the result of the serialized pattern object you send in the body, assuming the format is correct.

- #### DELETE pattern by id
   /api/patterns/:id
   This will delete the pattern with that id from the database table.

### Future requests:

The next version will add search and sort functions to the patterns.

A future version will require authentication and requests for patters will be specific to a user and project. There will be ways to view all patterns of a user, all patterns of a project, all projects of a user, all users...
Eventually collaborative projects and pattern sharing will be possible.

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone https://github.com/GeorgeLuther/polyperc-api.git NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## IMPORTANT NOTE ON NODE VERSION

If you are running Node v14, then you must also upgrade your `pg` package to v8.x by typing:

`npm install pg@8`

If you are on Node v12 or lower, run `npm install` as normal and let it remain locked to major version `pg` v7.

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

Migrate the dev database `npm run migrate`

Migrate the test database `npm run migrate:test`
