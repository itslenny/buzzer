# Buzzer

A real-time buzzer app using [Node](http://), [Sails.js](http://sailsjs.org/), [MongoDB](http://www.mongodb.org/), [socket.io](http://socket.io/), [angular.js](https://angularjs.org/) [chart.js](http://jtblin.github.io/angular-chart.js/), and probably some other buzz-wordy-tech (pun intended).


See buzz_alias.txt for setup info.

## Deployment (Heroku)

Hosted at: https://wdi-dc-buzzer.herokuapp.com

Initial (one-time) Setup
```bash
$ heroku create
$ heroku addons:add mongolab
$ heroku config:set NODE_ENV=production
$ git push heroku master
# We need to add the first user
$ heroku run sails console

sails> User.create({ email: "charlie@example.com",
                     firstName: "Charlie",
                     lastName: "Unicorn",
                     password: "candy_m0unta1n"}).exec(function(err, user) {})
```

### When a developer is added to the team.

# Use the existing heroku app
1. Ask another instructor to add you as a collaborator.
2. Add that app as a remote.
``` bash
    $ git remote add heroku git@heroku.com:wdi-dc-buzzer.git
```

### Running locally

1. Add the first user
  1. Start REPL
    ``` bash
    $ sails console
    ```
  2. Add the first user using the command listed in "Initial Setup"
  3. Stop the console, so that you can start the server.  Note: `sails console` should act as the server, but it wasn't for us (03/2015).
2. Start the server.
  ``` bash
  sails server
  ```
3. Verify it is available at `localhost:1337`


### Verify
After this, verify your app is up and running.  Look at buzz_alias.txt file, for the commands to call the server.
