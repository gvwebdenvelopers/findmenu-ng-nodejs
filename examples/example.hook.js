//remember install lib gith
var gith = require('gith').create(4000); //run your prefer port
var exec = require('child_process').exec;

gith({
    repo: 'gvwebdenvelopers/findmenu-ng-nodejs' // the github-user/repo-name
}).on('all', function(payload) {

    console.log('push received');
    exec('/home/usuario/findmenu-ng-nodejs/hook/post-update.sh ' + payload.branch, function(err, stdout, stderr) {
        if (err) { return err; }
        console.log(stdout);
        console.log('git deployed to branch ' + payload.branch);
    });
});