#! /usr/bin/env node

let argv = require('yargs').argv, cmd = argv._[0];
let request = require('request-promise');
let pm2 = require('pm2');

switch(cmd){
  case "create":
  case "register": case "reg":
    let route;
    if(argv.domain){
      route = '/register/' + argv.domain;
      if(argv.port) route += '/' + argv.port;
      
      if(argv.domain.endsWith('.clive.io'))
        require('https').add(argv.domain.substr(0,-9));
        .then(()=>{console.log("Successfully added HTTPS to " + argv.domain.substr(0,-9) + ".clive.io");})
        .catch((err)=>{console.log("HTTPS addition failed, perhaps it's already registered?", err);});
    }else{
      console.error("No --domain specified for registration");
      process.exit(1);
    }
    
    request("http://localhost:10000" + route).then((port) => {
      if(isNaN(port)) //if the router-server returns no port, that means we specified one ourselves.
        port = argv.port;
      
      console.log("Using port " + port);
      
      if(cmd == "create")
        return new Promise((res, rej)=>{
          pm2.start({
            script: "npm",
            args: "start",
            name: argv.domain,
            env: {PORT: port}
          }, (err) => { if(err) rej(err); else res(); });
        }).then(console.log);
    }).catch(console.error);
    
    break;
  
  case "delete":
    if(argv.domain) pm2.delete(argv.domain, console.error);
  case "unregister": case "unreg":
    if(argv.domain) request('/unregister/' + argv.domain).then(console.log).catch(console.error);
    else console.error("No domain specified for unregistration");
    break;
  
  case "show": case undefined:
    request('http://localhost:10000').then(console.log).catch(console.error);
    break;
  
  default:
    console.error("unrecognized command");
}
