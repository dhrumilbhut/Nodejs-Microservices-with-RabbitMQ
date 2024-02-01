const amqp = require('amqplib');
connect();

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue('jobs2');
        channel.consume('jobs2', message => {
            const input = JSON.parse(message.content.toString());
            console.log(input.number);
            if (input.number == 7) {
                channel.ack(message);
            }
        })
        console.log('Waiting for messages...');
    }
    catch (err) {
        console.error(err);
    }
}
