const express = require("express");
const { Kafka } = require("kafkajs");
const app = express();
const port = 3001;

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();

app.get("/purchase/:productId", async (req, res) => {
    const productId = req.params.productId;
    await producer.connect();
    await producer.send({
        topic: "stock-update",
        messages: [{ value: `Product ${productId} purchased` }],
    });
    await producer.disconnect();
    res.send(`Purchase made for product ${productId}, stock update initiated`);
});

app.listen(port, () => {
    console.log(`Order service running at :${port}`);
});
