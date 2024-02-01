const amqp = require('amqplib');
connect();
const msg = {number: process.argv[2]}
async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs2");
        channel.sendToQueue("jobs2", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
    }
    catch (err){
        console.error(err);
    }
}
