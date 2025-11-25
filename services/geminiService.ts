/**
 * Offline-safe mock implementations replacing previous Gemini API calls.
 * These helpers return deterministic content so the site works without API keys.
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateAgencyAsset = async (
  prompt: string,
  size: '1K' | '2K' | '4K' = '1K'
): Promise<string> => {
  // Simulate async work so UI loaders still behave nicely
  await delay(600);

  // Return a themed placeholder image so the app stays visual without external APIs
  const encodedPrompt = encodeURIComponent(prompt || 'creative agency concept');
  return `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=${
    size === '4K' ? 2400 : size === '2K' ? 1600 : 1200
  }&q=80&blend=000&sat=-25&txt-align=bottom&txt-size=32&txt=${encodedPrompt}`;
};

export const generateStrategicCampaign = async (brief: string): Promise<string> => {
  await delay(500);
  const safeBrief = brief || 'Your brand brief';
  return `Core Insight:\n- ${safeBrief} deserves a bold, tech-forward narrative that speaks to culture.\n\nCreative Concept Name:\n- Lumen Shift Initiative\n\nKey Visual Direction:\n- Neon gradients, kinetic typography, and holographic UI frames.\n\nActivation Idea:\n- Interactive microsite with live data visualizations and social AR filters.`;
};

export const generateContentDescription = async (
  type: 'project' | 'service',
  title: string
): Promise<any> => {
  await delay(400);

  if (type === 'project') {
    return {
      challenge: `${title} needed a distinctive presence that merges digital craft with human storytelling.`,
      solution: 'We delivered a modular design system, immersive landing flow, and motion cues that signal innovation.',
      type: 'Branding + Web',
      stats: '+180% engagement uplift'
    };
  }

  return {
    desc: `${title} delivered with a futurist, conversion-led approach tailored to fast-moving brands.`,
    type: 'Service',
    stats: '+95 NPS'
  };
};
