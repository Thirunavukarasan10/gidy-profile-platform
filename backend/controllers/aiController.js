import OpenAI from 'openai';

// Initialize OpenAI client (will be null if API key not provided)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

export const aiController = {
  async generateBio(req, res) {
    const { skills, title, interests } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ error: 'Skills are required' });
    }

    try {
      // If OpenAI is not configured, use fallback template-based generation
      if (!openai) {
        const bio = generateFallbackBio(skills, title, interests);
        return res.json({ bio, method: 'template' });
      }

      // Use OpenAI to generate bio
      const prompt = `Generate a professional, engaging bio (2-3 sentences) for a professional with the following details:
      
Title/Role: ${title || 'Professional'}
Skills: ${skills.join(', ')}
${interests ? `Interests: ${interests}` : ''}

The bio should:
- Be concise and professional
- Highlight key strengths
- Show personality
- Be written in first person
- Sound natural and authentic

Just return the bio text, nothing else.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      });

      const bio = completion.choices[0].message.content.trim();
      res.json({ bio, method: 'ai' });
    } catch (error) {
      console.error('Error generating bio:', error);
      
      // Fallback to template if AI fails
      const bio = generateFallbackBio(skills, title, interests);
      res.json({ bio, method: 'template', warning: 'AI generation failed, used template' });
    }
  }
};

// Fallback bio generation using templates
function generateFallbackBio(skills, title, interests) {
  const templates = [
    `I'm a ${title || 'professional'} specializing in ${skills.slice(0, 3).join(', ')}. Passionate about creating innovative solutions and continuous learning. ${interests ? `In my free time, I enjoy ${interests}.` : 'Always eager to take on new challenges.'}`,
    
    `${title || 'Professional'} with expertise in ${skills.slice(0, 3).join(', ')}. I love building things that make a difference and collaborating with talented teams. ${interests ? `When I'm not coding, you'll find me ${interests}.` : 'Driven by curiosity and the desire to solve complex problems.'}`,
    
    `Experienced ${title || 'professional'} focused on ${skills[0] || 'technology'} and ${skills[1] || 'innovation'}. I thrive on turning ideas into reality through clean code and thoughtful design. ${interests ? `Outside of work, I'm passionate about ${interests}.` : 'Committed to craftsmanship and excellence in everything I do.'}`
  ];

  // Select a random template
  return templates[Math.floor(Math.random() * templates.length)];
}
