import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import BlogIntro from '@/components/BlogIntro';

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <>
      <BlogIntro />
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
