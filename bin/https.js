#! /usr/bin/env node

let request = require('request-promise');

function addSubdomain(subdomain){
  if(/[^a-zA-Z0-9]/.test(subdomain))
    return Promise.reject("Non-alpha-numeric-dash subdomain name.");
  else
    request('http://localhost:10000/https/' + subdomain);
}

if(require.main === module){
  addSubdomain(require('yargs').argv._[0])
  .then(console.log)
  .catch(err=>{console.error('Failed:', err);exit(1);});
}
else
  module.exports = {add: addSubdomain};
