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
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
