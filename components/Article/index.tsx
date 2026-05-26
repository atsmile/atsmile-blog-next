import { formatRichText } from '@libs/utils';
import { replaceLinksWithOgpCards } from '@libs/ogpCard';
import type { Article } from '@libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';

type Props = {
  data: Article;
};

export default async function Article({ data }: Props) {
  const content = await replaceLinksWithOgpCards(formatRichText(data.content));

  return (
    <main className="flex flex-col between align-items-center">
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-green-500">{data.title}</h1>
      <TagList tags={data.tags} />
      <div className="flex items-center justify-between mb-4">
        {data.writer && (
          <div className={styles.writer}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
              />
              <img
                src={data.writer?.image?.url}
                alt=""
                className={styles.writerIcon}
                width={data.writer?.image?.width}
                height={data.writer?.image?.height}
              />
            </picture>
            <span className={styles.writerName}>{data.writer?.name}</span>
          </div>
        )}
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      {data.thumbnail ? (
        <picture>
          <source
            type="image/webp"
            media="(max-width: 640px)"
            srcSet={`${data.thumbnail.url}?fm=webp&w=414 1x, ${data.thumbnail.url}?fm=webp&w=414&dpr=2 2x`}
          />
          <source
            type="image/webp"
            srcSet={`${data.thumbnail.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
          />
          <img
            src={data.thumbnail.url}
            alt=""
            className="w-full h-auto object-cover rounded-lg mb-6"
            width={data.thumbnail.width}
            height={data.thumbnail.height}
          />
        </picture>
      ) : (
        <div className="w-full h-48 md:h-64 rounded-lg bg-linear-to-br from-amber-300 to-green-300 flex items-center justify-center p-6 mb-6">
          <span className="text-white text-sm font-semibold leading-relaxed line-clamp-3 text-center text-shadow">
            {data.title}
          </span>
        </div>
      )}
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <Profile writer={data.writer} />
    </main>
  );
}
