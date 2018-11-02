var mqtt = require('mqtt')
var host = "10.50.0.208"

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ port: 40510 })

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  var client  = mqtt.connect('mqtt://' + host, { port: 1883 })
  client.on('connect', function () {
    client.subscribe('hermes/intent/#');
    ws.send("Connected to " + host)
    console.log('connected')
  });

  client.on('message', function (topic, message) {
    console.log(topic, message)
    ws.send(JSON.stringify({ topic, message }))
  })
})
