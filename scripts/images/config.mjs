// Central image-generation configuration. Change models, quality tiers or sizes here only.
// Every value can also be overridden with an environment variable, so no code change is needed.
const env = process.env;

export const imageConfig = Object.freeze({
  endpoint: env.OPENAI_IMAGE_ENDPOINT || 'https://api.openai.com/v1/images/generations',
  models: Object.freeze({
    flare: env.OPENAI_IMAGE_MODEL_FLARE || 'gpt-image-2.5-flare', // default: cost-efficient
    sunburst: env.OPENAI_IMAGE_MODEL_SUNBURST || 'gpt-image-2.5-sunburst', // premium: precision work
  }),
  quality: Object.freeze({
    standard: env.OPENAI_IMAGE_QUALITY_DEFAULT || 'medium',
    premium: env.OPENAI_IMAGE_QUALITY_PREMIUM || 'high',
  }),
  sizes: Object.freeze({
    square: '1024x1024',
    landscape: '1536x1024',
    portrait: '1024x1536',
  }),
  // Responsive WebP widths produced for each orientation after generation.
  variants: Object.freeze({
    square: [480, 1024],
    landscape: [480, 960, 1536],
    portrait: [480, 768, 1024],
  }),
  webpQuality: Number(env.IMAGE_WEBP_QUALITY || 82),
  outputFormat: 'png', // lossless master; WebP derivatives are made locally with sharp
  requestTimeoutMs: Number(env.OPENAI_IMAGE_TIMEOUT_MS || 180000),
  maxRetries: 3,
  paths: Object.freeze({
    masters: 'assets/generated',
    public: 'public/images/gen',
    registry: 'src/data/generated-images.json',
  }),
});
