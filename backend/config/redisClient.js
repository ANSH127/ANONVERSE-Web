const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: 's8B0p6U42AWG31qL6VAMKkAAhlOOTWwL',
    socket: {
        host: 'redis-17500.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 17500
    }
});
redisClient.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

module.exports = { redisClient, connectRedis };