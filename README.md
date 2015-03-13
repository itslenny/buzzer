# Buzzer

A real-time buzzer app using [Node](http://), [Sails.js](http://sailsjs.org/), [MongoDB](http://www.mongodb.org/), [socket.io](http://socket.io/), [angular.js](https://angularjs.org/) [chart.js](http://jtblin.github.io/angular-chart.js/), and probably some other buzz-wordy-tech (pun intended).

Hosted at: https://wdi-buzzer.herokuapp.com

## Instructor setup:
- Before InstallFest
   - Auth: Request lenny@ga.co to add each instructor.
   - Create a room: post to room route. `user/<user_id>/rooms`, `name: <class name> , size: <# of students>`
- For each request, login to buzzer app: `https://wdi-buzzer.herokuapp.com/login`


## Student Setup:
Each student creates an alias once (during InstallFest).

    export GA_CLASS_NAME="wdi-dc-5"

    alias wdibuzz="_wdibuzz(){ curl \"http://wdi-buzzer.herokuapp.com/buzz/do/${GA_CLASS_NAME}/$(whoami | xargs)_$(ifconfig | grep ether | head -1 | sed 's/[[:space:]|:|ether]*//g')/\$1\" --silent | sed 's/[[:space:]]$//g'; return; }; _wdibuzz"



##TODO

* Switch to single page
* Reset button
* User Management
* Room Management
* Fix alias for bash
* Add Clearer http errors / 404
* Fix colors (hue happiness)
* SWITCH BACK TO CDN