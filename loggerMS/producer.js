const amqp = require('amqplib');
const config = require('./config');
class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async publishMessage(message, routingKey) {
        if(!this.channel) {
            await this.createChannel();
        }

        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct')

        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        }

        this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
        );

        console.log(`The message [${message}] has been published with routing key [${routingKey}] and exchange name [${exchangeName}]`)
    }
}

module.exports = Producer;
