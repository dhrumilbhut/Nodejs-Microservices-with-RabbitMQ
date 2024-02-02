const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer');
const producer = new Producer();

app.use(bodyParser.json("application/json"));

app.post('/sendLog', async (req, res) => {
    const { logType, message } = req.body;
    await producer.publishMessage(message, logType);
    res.send('Log sent');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
