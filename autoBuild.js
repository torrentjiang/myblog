const http = require('http');
const createHandler = require('github-webhook-handler');
const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });

http
  .createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404;
      res.end('no such location');
    });
  })
  .listen(7777);

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref,
  );
  // 执行autoBuild.sh
  run_cmd('sh', ['./autoBuild.sh'], function (text) {
    console.log(text);
  });
});

// 新增run_cmd 执行脚本函数
function run_cmd(cmd, args, callback) {
  let spawn = require('child_process').spawn;
  let child = spawn(cmd, args);
  let resp = '';

  child.stdout.on('data', function (buffer) {
    resp += buffer.toString();
  });
  child.stdout.on('end', function () {
    callback(resp);
  });
}
