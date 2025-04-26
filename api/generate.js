export default async (req, res) => {
  try {
    const { neuroFlow, answers, tier = 'free' } = req.body;
    
    const resume = await generateNeuroInclusiveResume({
      neuroFlow,
      answers,
      tier
    });

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ 
      error: 'Generation failed',
      details: error.message
    });
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
