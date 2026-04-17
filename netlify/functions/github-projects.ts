// netlify/functions/github-projects.ts

import type { Handler } from '@netlify/functions';

const GITHUB_API_URL =
  'https://api.github.com/users/TheAbyssSage/repos?sort=created&per_page=50';

export const handler: Handler = async (event, context) => {
  try {
    console.log('GitHub projects function called with event:', {
      httpMethod: event.httpMethod,
      path: event.path,
      queryStringParameters: event.queryStringParameters,
    });

    const token = process.env.GITHUB_TOKEN;
    console.log('Using GitHub token:', token ? 'Yes' : 'No');

    const headers: Record<string, string> = {
      'User-Agent': 'netlify-function',
      Accept: 'application/vnd.github+json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log('Making request to GitHub API:', GITHUB_API_URL);
    const response = await fetch(GITHUB_API_URL, {
      method: 'GET',
      headers,
    });

    console.log('GitHub API response status:', response.status);

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText);
      const errorBody = await response.text();
      console.error('GitHub API error body:', errorBody);
      
      // Return empty array instead of error to allow fallback to work
      return {
        statusCode: 200,
        body: JSON.stringify([]),
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300',
        },
      };
    }

    const repos = await response.json();
    console.log('GitHub API returned repos count:', Array.isArray(repos) ? repos.length : 0);

    // Validate that we have an array
    const validRepos = Array.isArray(repos) ? repos : [];
    
    return {
      statusCode: 200,
      body: JSON.stringify(validRepos),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    };
  } catch (err) {
    console.error('GitHub projects function error:', err);
    // Return empty array instead of error to allow fallback to work
    return {
      statusCode: 200,
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    };
  }
};
