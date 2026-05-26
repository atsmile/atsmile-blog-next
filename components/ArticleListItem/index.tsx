import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@libs/microcms';
import TagList from '../TagList';
import PublishedDate from '../Date';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li className="bg-white rounded-xl p-5 mb-6 border border-green-200">
      <Link href={`/articles/${article.id}`} className="md:flex md:gap-10">
        {article.eyecatch ? (
          <Image
            src={article.eyecatch?.url}
            alt=""
            width={240}
            height={126}
            sizes="(max-width: 640px) 414px, 240px"
            className="w-full mb-2 h-auto md:w-60 md:mb-0 rounded-lg"
          />
        ) : (
          <div className="w-full mb-2 md:w-60 md:min-w-60 md:mb-0 md:shrink-0 h-32 md:h-31.5 rounded-lg bg-linear-to-br from-amber-300 to-green-300 flex items-center justify-center p-3">
            <span className="text-white text-xs font-semibold leading-relaxed line-clamp-3 text-shadow">
              {article.title}
            </span>
          </div>
        )}
        <dl>
          <dt className="font-bold text-lg">{article.title}</dt>
          <dd>
            <TagList tags={article.tags} hasLink={false} />
          </dd>
          <dd className="text-sm text-gray-500 text-right">
            <PublishedDate date={article.publishedAt || article.createdAt} />
          </dd>
        </dl>
      </Link>
    </li>
  );
}
