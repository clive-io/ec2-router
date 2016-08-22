ec2-router
==========
Copyright (c) 2016 Clive Chan.
MIT license.

[![bitHound Overall Score](https://www.bithound.io/github/cchan/ec2-router/badges/score.svg)](https://www.bithound.io/github/cchan/ec2-router)
[![Known Vulnerabilities](https://snyk.io/test/github/cchan/ec2-router/badge.svg)](https://snyk.io/test/github/cchan/ec2-router)

(A part of my [ec2 server suite](https://github.com/cchan/ec2))

The node server on which all the other web-based stuff on my ec2 machine depends.

## Install
To install the CLI, run `cli/install`, and to uninstall the CLI, run `cli/uninstall`.

## API
Opens up local port 10000 which can be used as an HTTP API to register routes in a reverse proxy server. For example:

    curl -sS localhost:10000/register/apcs.clive.io/10002
    router register apcs.clive.io 10002        # Registers incoming requests directed at apcs.clive.io to go to the apcs server running on port 10002.
    
    curl -sS localhost:10000/unregister/apcs.clive.io
    router unregister apcs.clive.io            # Unregisters apcs.clive.io, so that visitors will see simply "Not Found"

## SSL
SSL support is kind of awkward at the moment and hopefully will be fixed soon.

    curl -sS -X POST localhost:10000/register/ssl.clive.io/10443 # Registers incoming requests directed at HTTPS. Optionally POST some SSL options: key, cert, ca. See the default config (top of router.js) for example.

## NPM start shortform
For the most common usecase - running a nodejs server - there's a shortform. Run this in the project directory:

    router create clive.io cliveio.clive.io

This will register the reverse proxy route for clive.io, and run `npm start`. To undo this:

    router delete clive.io cliveio.clive.io

## Saving
The router also automatically saves all of its routes to `~/.router/save.json`, and attempts to load them on start.
