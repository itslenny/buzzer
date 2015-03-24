# Buzzer

A real-time buzzer app using [Node](http://), [Sails.js](http://sailsjs.org/), [MongoDB](http://www.mongodb.org/), [socket.io](http://socket.io/), [angular.js](https://angularjs.org/) [chart.js](http://jtblin.github.io/angular-chart.js/), and probably some other buzz-wordy-tech (pun intended).

Hosted at: https://wdi-buzzer.herokuapp.com

See buzz_alias.txt for setup info.

## Deployment (Heroku)

```bash
$ heroku create
$ heroku addons:add mongolab
$ heroku config:set NODE_ENV=production
$ git push heroku master
$ heroku run sails console # we need to add a user

sails> User.create({ email: "charlie@example.com",
                     firstName: "Charlie",
                     lastName: "Unicorn",
                     password: "candy_m0unta1n"}).exec(function(err, user) {})
```

After this, verify your app is up and running, then see the buzz_alias.txt file.
