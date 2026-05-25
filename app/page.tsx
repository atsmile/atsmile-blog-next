import { getList } from '@/libs/microcms';
import ArticleList from '@/components/ArticleList';
import BlogIntro from '@/components/BlogIntro';

export default async function Page() {
  // トップページでは最新5件の記事を取得して表示
  const data = await getList({
    limit: 5,
  });
  return (
    <>
      <BlogIntro />
      <ArticleList articles={data.contents} />
    </>
  );
}
