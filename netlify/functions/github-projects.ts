import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const USERNAME = 'TheAbyssSage';

export const handler: Handler = async () => {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'GITHUB_TOKEN is not set.' }),
        };
    }

    const url = `https://api.github.com/users/${USERNAME}/repos?sort=created&per_page=50`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'sage-portfolio',
                Accept: 'application/vnd.github+json',
            },
        });

        if (!response.ok) {
            const text = await response.text();
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'GitHub error', status: response.status, body: text }),
            };
        }

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error', message: err?.message ?? 'unknown' }),
        };
    }
};
