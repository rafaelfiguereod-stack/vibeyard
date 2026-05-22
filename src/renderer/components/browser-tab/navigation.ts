import type { BrowserTabInstance } from './types.js';

// javascript: is intentionally excluded — it is a code-injection vector and must never be loaded.
const KNOWN_SCHEMES = /^(https?|file|ftp|ftps|about|chrome|data|blob|view-source|mailto):/i;

export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed && !KNOWN_SCHEMES.test(trimmed)) {
    return 'http://' + trimmed;
  }
  return trimmed;
}

export function navigateTo(instance: BrowserTabInstance, url: string): void {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) return;
  instance.urlInput.value = normalizedUrl;
  instance.webview.src = normalizedUrl;
  instance.newTabPage.style.display = 'none';
}
