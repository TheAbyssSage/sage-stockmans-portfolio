// netlify/functions/github-projects.ts

import type { Handler } from '@netlify/functions';

const GITHUB_API_URL =
  'https://api.github.com/users/TheAbyssSage/repos?sort=created&per_page=50';

export const handler: Handler = async (event, context) => {
  try {
    const token = process.env.GITHUB_TOKEN;

    const headers: Record<string, string> = {
      'User-Agent': 'netlify-function',
      Accept: 'application/vnd.github+json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(GITHUB_API_URL, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'GitHub API error',
          status: response.status,
          statusText: response.statusText,
        }),
      };
    }

    const repos = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(repos),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    };
  } catch (err) {
    console.error('GitHub projects function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
