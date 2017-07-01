module.exports = function(webserver, controller) {
  webserver.post('/interactive_message', function (req, res) {
    res.writeHead(200);
    res.end();
    console.log('--------------------------------------------------')
    console.log(req.body);
    console.log('controller', controller);
    controller.handleWebhookPayload(req, res);
  });
};