#! /usr/bin/env node

require('dotenv-safe').load();
let CF = require('cloudflare');

let client = new CF({
  email: process.env.CF_EMAIL,
  key: process.env.CF_KEY
});

function addSubdomain(subdomain){
  let rr = CF.DNSRecord.create({
    zone_id: process.env.CF_ZONE,
    type: 'CNAME',
    name: subdomain,
    content: 'clive.io',
    proxied: true
  });
  
  return client.addDNS(rr);
}

//If called on command line
if(require.main === module){
  let subdomain = require('yargs').argv._[0];
  if(/[^a-zA-Z0-9]/.test(subdomain)){
    console.error("Non-alphanumeric subdomain name.");
    process.exit(1);
  }
  addSubdomain(subdomain).then(console.log).catch((err)=>{console.error('Failed:', err);exit(1);});
}
else
  module.exports = {add: addSubdomain};
