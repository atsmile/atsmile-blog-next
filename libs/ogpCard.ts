export type OgpData = {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
};

export async function fetchOgp(url: string): Promise<OgpData | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'bot' },
    });
    if (!res.ok) return null;

    const html = await res.text();

    const get = (property: string): string => {
      const match =
        html.match(new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]*)"`, 'i')) ||
        html.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*property="${property}"`, 'i'));
      return match?.[1] ?? '';
    };

    const title = get('og:title') || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '';
    const description = get('og:description');
    const image = get('og:image');
    const siteName = get('og:site_name');

    if (!title) return null;

    return { url, title, description, image, siteName };
  } catch {
    return null;
  }
}

export function buildCardHtml(ogp: OgpData): string {
  return `
    <a href="${ogp.url}" target="_blank" rel="noopener noreferrer" class="ogp-card">
      ${ogp.image ? `<img src="${ogp.image}" alt="${ogp.title}" class="ogp-card__image" />` : ''}
      <div class="ogp-card__body">
        <div class="ogp-card__title">${ogp.title}</div>
        ${ogp.description ? `<div class="ogp-card__description">${ogp.description}</div>` : ''}
        <div class="ogp-card__url">${ogp.siteName || new URL(ogp.url).hostname}</div>
      </div>
    </a>`.trim();
}

export async function replaceLinksWithOgpCards(html: string): Promise<string> {
  const linkPattern = /<p><a href="(https?:\/\/[^"]+)">\s*\1\s*<\/a><\/p>/g;
  const matches = [...html.matchAll(linkPattern)];

  let result = html;
  for (const match of matches) {
    const url = match[1];
    const ogp = await fetchOgp(url);
    if (ogp) {
      result = result.replace(match[0], buildCardHtml(ogp));
    }
  }

  return result;
}
