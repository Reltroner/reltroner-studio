import redis from '@/lib/redis';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { key, value } = req.body;
        await redis.set(key, value);
        res.status(200).json({ message: 'Value set successfully!' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
