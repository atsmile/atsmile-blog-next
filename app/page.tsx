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
      <h2 className="text-2xl font-bold mb-4 text-green-500">最新記事</h2>
      <ArticleList articles={data.contents} />
    </>
  );
}
