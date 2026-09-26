import { ScreeningResult, UserConsentState } from '../types';

const CONSENT_STORAGE_KEY = 'clinicascreen_user_consent';
const HISTORY_STORAGE_KEY = 'clinicascreen_screening_history';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_clinical_diagnostic_1790375342005.jpg',
  skin: '/src/assets/images/skin_dermatology_lens_1790375358510.jpg',
  eye: '/src/assets/images/eye_ophthalmology_scan_1790375370501.jpg',
  dental: '/src/assets/images/oral_dental_imaging_1790375381104.jpg',
  voice: '/src/assets/images/voice_acoustic_spectrogram_1790375391546.jpg'
};

export function getStoredConsent(): UserConsentState {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading consent', e);
  }
  return {
    data_collection_agreed: false,
    model_improvement_opt_in: false,
    local_storage_agreed: true
  };
}

export function saveStoredConsent(consent: UserConsentState): void {
  try {
    consent.agreed_timestamp = new Date().toISOString();
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (e) {
    console.error('Failed saving consent', e);
  }
}

export function getScreeningHistory(): ScreeningResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading screening history', e);
  }
  return [];
}

export function saveScreeningResult(result: ScreeningResult): void {
  try {
    const history = getScreeningHistory();
    // Prepend new result
    const updated = [result, ...history].slice(0, 30); // keep up to 30
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving result to history', e);
  }
}

export function deleteScreeningHistoryItem(id: string): void {
  try {
    const history = getScreeningHistory();
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed deleting item', e);
  }
}

export function purgeAllUserData(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch (e) {
    console.error('Failed purging data', e);
  }
}

// API Callers
export async function submitSkinScreening(payload: {
  image: string;
  symptoms?: string;
  context?: any;
  forceQualityFail?: boolean;
  demoMode?: boolean;
}): Promise<ScreeningResult> {
  const res = await fetch('/api/skin/screen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Screening request failed with HTTP ${res.status}`);
  }
  return res.json();
}

export async function submitEyeScreening(payload: {
  image: string;
  symptoms?: string;
  context?: any;
  forceQualityFail?: boolean;
  demoMode?: boolean;
}): Promise<ScreeningResult> {
  const res = await fetch('/api/eye/screen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Eye screening request failed with HTTP ${res.status}`);
  }
  return res.json();
}

export async function submitDentalScreening(payload: {
  image: string;
  symptoms?: string;
  context?: any;
  forceQualityFail?: boolean;
  demoMode?: boolean;
}): Promise<ScreeningResult> {
  const res = await fetch('/api/dental/screen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Dental screening request failed with HTTP ${res.status}`);
  }
  return res.json();
}

export async function submitVoiceScreening(payload: {
  taskResponses: Array<{ taskIndex: number; taskName: string; duration: number }>;
  symptoms?: string;
  forceQualityFail?: boolean;
}): Promise<ScreeningResult> {
  const res = await fetch('/api/voice/screen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Voice screening request failed with HTTP ${res.status}`);
  }
  return res.json();
}

export async function submitSymptomAnalysis(payload: {
  symptoms: string;
  duration?: string;
  associatedFactors?: string;
  category?: string;
}): Promise<ScreeningResult> {
  const res = await fetch('/api/symptoms/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Symptom analysis request failed with HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * Streams real-time tokens from Groq (model: openai/gpt-oss-120b)
 */
export async function streamGroqChat(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  userContext?: any,
  onDelta?: (text: string) => void
): Promise<string> {
  const res = await fetch('/api/groq/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, userContext })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Request failed with HTTP ${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('Readable stream not supported');

  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') {
          break;
        }
        try {
          const parsed = JSON.parse(payload);
          if (parsed.content) {
            fullText += parsed.content;
            onDelta?.(parsed.content);
          }
        } catch {
          // ignore parsing error
        }
      }
    }
  }

  return fullText;
}
