import { getList } from '@libs/microcms';
import { ARTICLES_PER_PAGE } from '@constants';
import Pagination from '@components/Pagination';
import ArticleList from '@components/ArticleList';

export default async function Page() {
  const data = await getList({
    limit: ARTICLES_PER_PAGE,
  });
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-green-500">記事一覧</h1>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
