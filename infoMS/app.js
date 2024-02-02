const amqp = require('amqplib');

async function consumeMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange("logExchange", "direct");

  const queue = await channel.assertQueue('InfoQueue');

  await channel.bindQueue(queue.queue, "logExchange", "info");

  await channel.consume(queue.queue, (msg) => {
      const data = JSON.parse(msg.content.toString());
      console.log(data);
      channel.ack(msg);
  });
}
consumeMessage();
