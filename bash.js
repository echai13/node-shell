var command = require('./command.js')


//first user prompt
process.stdout.write('prompt: ');
var cmds; //line of command
var len; //length of command array
var stdin = ""; //returned output for piping



process.stdin.on('data', function (data) {
    cmds = data.toString().trim().split(/\s*\|\s*/g);
    len = cmds.length;
    var stdin = "";
    execute(cmds.shift());
});

function execute(comd) {
  if(comd.indexOf(' ') !== -1) {
    var cmd = comd.substr(0, comd.indexOf(' '));
    var rest = comd.substr(comd.indexOf(' ') + 1);
  } else {
    var cmd = comd;
  }
  command[cmd](stdin, rest, done);
}


function done(output) {
  if(cmds.length > 0) {
    stdin = output.toString();
    execute(cmds.shift());
  } else {
    process.stdout.write(output);
    process.stdout.write("\n" + "prompt: ");
  }
}
