alias wdibuzz="_wdibuzz(){ curl \"http://localhost:1337/buzz/do/WDI-SEA01/$(whoami | xargs)_$(ifconfig en1 | grep ether | sed 's/[[:space:]]*//g')/\$1\" --silent | sed 's/[[:space:]]$//g' }; _wdibuzz"