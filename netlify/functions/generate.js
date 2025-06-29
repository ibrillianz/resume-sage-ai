import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { neuroFlow, answers, tier = 'free' } = JSON.parse(event.body);
    
    const resume = await generateNeuroInclusiveResume({
      neuroFlow,
      answers,
      tier
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(resume)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Generation failed',
        details: error.message
      })
    };
  }
};

async function generateNeuroInclusiveResume(params) {
  const { neuroFlow, answers, tier } = params;
  
  // Tier-based enhancements
  const tierFeatures = {
    free: { versions: 1, analysis: 'basic' },
    basic: { versions: 3, analysis: 'full' },
    premium: { versions: 'unlimited', analysis: 'premium' }
  };

  // Neuro-inclusive templates
  const templates = {
    structured: generateStructuredResume(answers, tierFeatures[tier]),
    explorative: generateExplorativeResume(answers, tierFeatures[tier])
  };

  return {
    ...templates[neuroFlow],
    neuroScore: calculateNeuroScore(answers),
    accessibility: {
      dyslexiaSupported: true,
      voiceInputSupported: true
    }
  };
}

function calculateNeuroScore(answers) {
  // Simplified neuro-inclusivity scoring
  const keywords = ['creative', 'adapt', 'unique', 'neurodiverse'];
  const matches = answers.join(' ').match(new RegExp(keywords.join('|'), 'gi'));
  return Math.min(100, (matches?.length || 0) * 20 + 40);
}

function generateStructuredResume(answers, features) {
  return { type: 'structured', content: 'Structured Resume', features };
}

function generateExplorativeResume(answers, features) {
  return { type: 'explorative', content: 'Explorative Resume', features };
}