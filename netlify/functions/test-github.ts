import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    // Simple test to verify the function is working
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Function is working!',
        timestamp: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    };
  } catch (err) {
    console.error('Test function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Function test failed',
        message: err instanceof Error ? err.message : 'Unknown error',
      }),
    };
  }
};