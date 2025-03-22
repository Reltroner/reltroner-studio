import { createClient } from 'redis';

const redis = createClient({
    url: 'redis://localhost:6379', // Ganti dengan 6380 jika menggunakan port lain
});

redis.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redis.connect();
    console.log('Connected to Redis');
})();

export default redis;
