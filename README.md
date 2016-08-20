ec2-router
==========
Copyright (c) 2016 Clive Chan.
MIT license.

[![bitHound Overall Score](https://www.bithound.io/github/cchan/ec2-router/badges/score.svg)](https://www.bithound.io/github/cchan/ec2-router)
[![Known Vulnerabilities](https://snyk.io/test/github/cchan/ec2-router/badge.svg)](https://snyk.io/test/github/cchan/ec2-router)

(A part of my [ec2 server suite](https://github.com/cchan/ec2))

The node server on which all the other web-based stuff on my ec2 machine depends.
Opens up local port 10000 which can be used to register domains in a reverse proxy server. For example:

    curl -sS localhost:10000/register/apcs.clive.io/10002        # Registers incoming requests directed at apcs.clive.io to go to the apcs server running on port 10002.
    curl -sS -X POST localhost:10000/register/ssl.clive.io/10443 # Registers incoming requests directed at HTTPS. Optionally POST some SSL options: key, cert, ca. See the default config (top of router.js) for example.
    curl -sS localhost:10000/unregister/apcs.clive.io            # Unregisters apcs.clive.io, so that visitors will see simply "Not Found"

Automatically saves to and loads from `~/.router/save.json`.
