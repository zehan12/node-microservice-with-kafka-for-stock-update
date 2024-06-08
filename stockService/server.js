const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "stock-group" });
const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "stock-update", fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(
                `Stock update triggered for: ${message.value.toString()}`
            );
            // Here you can implement the logic to update the stock
        },
    });
};

run().catch(console.error);
