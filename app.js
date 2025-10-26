var express = require('express')

var app = express()

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
})