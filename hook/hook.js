var gith = require('gith').create(6000);  // run on port 6000
var exec = require('child_process').exec; 

gith({
  repo: 'gvwebdenvelopers/findmenu-ng-nodejs'  // the github-user/repo-name
}).on('all', function(payload){

    console.log("push received");
    exec('/home/jordimart/findmenu-ng-nodejs/hook/post-update.sh ' + payload.branch, function(err, stdout, stderr){
      if (err) return err;
      console.log(stdout);
      console.log("git deployed to branch " + payload.branch);
    });
});




