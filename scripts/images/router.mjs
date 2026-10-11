// Picks the model, quality and size for an image task from its declared traits,
// so nobody has to choose a model by hand.
import { imageConfig } from './config.mjs';

/**
 * @typedef {'hero' | 'key' | 'supporting'} Priority
 * @typedef {{
 *   priority: Priority,
 *   orientation: 'square' | 'landscape' | 'portrait',
 *   subjects?: 'none' | 'single' | 'multiple',
 *   complexity?: 'low' | 'high',
 *   reference?: boolean,
 * }} ImageTraits
 */

/** @param {ImageTraits} traits @param {{ escalate?: boolean }} [options] */
export function routeImage(traits, options = {}) {
  const reasons = [];
  if (options.escalate) reasons.push('escalated after insufficient Flare result');
  if (traits.priority === 'hero') reasons.push('homepage hero / high-priority banner');
  if (traits.subjects === 'multiple') reasons.push('multiple people in one scene');
  if (traits.complexity === 'high') reasons.push('complex lighting, architecture or detailed commercial scene');
  if (traits.reference) reasons.push('reference-image based / appearance preservation');

  const tier = reasons.length > 0 ? 'sunburst' : 'flare';
  if (tier === 'flare') reasons.push('standard single-subject or supporting visual');

  const premiumQuality = traits.priority === 'hero' || traits.priority === 'key';
  return {
    tier,
    model: imageConfig.models[tier],
    quality: premiumQuality ? imageConfig.quality.premium : imageConfig.quality.standard,
    size: imageConfig.sizes[traits.orientation],
    reasons,
  };
}
