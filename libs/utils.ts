import { formatInTimeZone } from 'date-fns-tz';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

export const formatDate = (date: string) => {
  return formatInTimeZone(new Date(date), 'Asia/Tokyo', 'd MMMM, yyyy');
};

export const formatRichText = (richText: string) => {
  return richText.replace(
    /<pre><code(?: class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const decoded = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      const highlight = (text: string, l?: string) => {
        if (!l) return hljs.highlightAuto(text);
        try {
          return hljs.highlight(text, { language: l.replace(/^language-/, '') });
        } catch {
          return hljs.highlightAuto(text);
        }
      };
      const result = highlight(decoded, lang);
      const classAttr = lang ? ` class="${lang}"` : '';
      return `<pre><code${classAttr}>${result.value}</code></pre>`;
    },
  );
};
