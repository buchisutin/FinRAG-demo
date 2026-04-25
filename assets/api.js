(function () {
  const API_KEY_STORAGE = "rag_api_key";

  function getApiKey() {
    return (localStorage.getItem(API_KEY_STORAGE) || "").trim();
  }

  function setApiKey(value) {
    localStorage.setItem(API_KEY_STORAGE, (value || "").trim());
  }

  async function apiFetch(url, options) {
    const opts = options ? { ...options } : {};
    const headers = new Headers(opts.headers || {});
    const apiKey = getApiKey();
    if (apiKey) {
      headers.set("X-API-Key", apiKey);
    }
    opts.headers = headers;
    const res = await fetch(url, opts);
    if (!res.ok) {
      let detail = "";
      try {
        const body = await res.json();
        detail = body.detail || JSON.stringify(body);
      } catch (_) {
        detail = await res.text();
      }
      throw new Error(`HTTP ${res.status}: ${detail || "请求失败"}`);
    }
    return res;
  }

  async function apiJson(url, options) {
    const res = await apiFetch(url, options);
    return res.json();
  }

  function createSSE(path, params) {
    const q = new URLSearchParams(params || {});
    const key = getApiKey();
    if (key) {
      q.set("api_key", key);
    }
    return new EventSource(`${path}?${q.toString()}`);
  }

  window.RagApi = {
    getApiKey,
    setApiKey,
    apiFetch,
    apiJson,
    createSSE,
  };
})();
