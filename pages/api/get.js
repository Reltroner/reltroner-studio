import redis from '@/lib/redis';

export default async function handler(req, res) {
    const { key } = req.query;
    const value = await redis.get(key);
    
    if (value) {
        res.status(200).json({ key, value });
    } else {
        res.status(404).json({ message: 'Key not found' });
    }
}
