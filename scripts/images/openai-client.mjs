// Minimal server-side OpenAI Images client. Runs only in Node (build tooling) —
// the key is read from the environment and never written to disk, logs or client bundles.
import { imageConfig } from './config.mjs';

const RETRYABLE = new Set([408, 409, 429, 500, 502, 503, 504]);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export function requireApiKey() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error('OPENAI_API_KEY is not set. Add it to .env (never commit it) or export it in your shell.');
  return key;
}

async function readError(response) {
  try {
    const body = await response.json();
    return body?.error?.message || JSON.stringify(body);
  } catch {
    return response.statusText;
  }
}

/** @returns {Promise<Buffer>} decoded image bytes */
export async function generateImage({ model, prompt, size, quality }) {
  const apiKey = requireApiKey();
  const body = JSON.stringify({ model, prompt, size, quality, n: 1, output_format: imageConfig.outputFormat });

  for (let attempt = 1; attempt <= imageConfig.maxRetries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), imageConfig.requestTimeoutMs);
    try {
      const response = await fetch(imageConfig.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body,
        signal: controller.signal,
      });
      if (!response.ok) {
        const message = await readError(response);
        if (RETRYABLE.has(response.status) && attempt < imageConfig.maxRetries) {
          console.warn(`  ↻ ${response.status} from Images API (attempt ${attempt}): ${message}`);
          await wait(2 ** attempt * 1500);
          continue;
        }
        throw new Error(`Images API ${response.status}: ${message}`);
      }
      const json = await response.json();
      const b64 = json?.data?.[0]?.b64_json;
      if (!b64) throw new Error('Images API returned no image data.');
      return Buffer.from(b64, 'base64');
    } catch (error) {
      const aborted = error instanceof Error && error.name === 'AbortError';
      if (aborted && attempt < imageConfig.maxRetries) {
        console.warn(`  ↻ request timed out (attempt ${attempt}), retrying`);
        continue;
      }
      throw aborted ? new Error('Images API request timed out.') : error;
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error('Images API failed after retries.');
}
