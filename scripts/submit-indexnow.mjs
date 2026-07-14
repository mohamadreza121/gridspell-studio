const DEFAULT_SITE_URL = "https://gridspellstudio.com";
const DEFAULT_INDEXNOW_KEY = "c4eff21748a1961153c97fc0e7f4530d";
const DEFAULT_ENDPOINT = "https://api.indexnow.org/indexnow";

const siteUrl = (process.env.INDEXNOW_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
const endpoint = process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT;
const keyLocation = `${siteUrl}/${key}.txt`;
const sitemapUrl = `${siteUrl}/sitemap.xml`;
const dryRun = process.env.INDEXNOW_DRY_RUN === "true";

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

async function fetchWithRetry(url, options = {}, attempts = 18) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "user-agent": "GridSpell-IndexNow/1.0",
          ...(options.headers || {})
        }
      });

      if (response.ok) return response;

      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      console.log(`Waiting for production deployment (${attempt}/${attempts})...`);
      await sleep(10000);
    }
  }

  throw lastError;
}

async function getSitemapUrls() {
  const keyResponse = await fetchWithRetry(keyLocation);
  const hostedKey = (await keyResponse.text()).trim();

  if (hostedKey !== key) {
    throw new Error(`IndexNow key file at ${keyLocation} does not contain the expected key.`);
  }

  const sitemapResponse = await fetchWithRetry(sitemapUrl);
  const sitemap = await sitemapResponse.text();
  const matches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gims)];
  const expectedHost = new URL(siteUrl).hostname;
  const urls = [
    ...new Set(
      matches
        .map((match) => decodeXml(match[1].trim()))
        .filter((url) => {
          try {
            return new URL(url).hostname === expectedHost;
          } catch {
            return false;
          }
        })
    )
  ];

  if (urls.length === 0) {
    throw new Error(`No valid URLs were found in ${sitemapUrl}.`);
  }

  return urls;
}

async function submit() {
  const urlList = await getSitemapUrls();
  const payload = {
    host: new URL(siteUrl).hostname,
    key,
    keyLocation,
    urlList
  };

  if (dryRun) {
    console.log(`IndexNow dry run: ${urlList.length} URLs would be submitted.`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "user-agent": "GridSpell-IndexNow/1.0"
    },
    body: JSON.stringify(payload)
  });

  if (![200, 202].includes(response.status)) {
    const responseBody = await response.text();
    throw new Error(
      `IndexNow submission failed with HTTP ${response.status}${responseBody ? `: ${responseBody}` : ""}`
    );
  }

  console.log(`IndexNow accepted ${urlList.length} GridSpell URLs with HTTP ${response.status}.`);
}

submit().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
