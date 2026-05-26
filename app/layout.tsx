import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | @smile Blog',
    default: '@smile Blog',
  },
  description: 'まだまだ、つくる途中。',
  openGraph: {
    title: {
      template: '%s | @smile Blog',
      default: '@smile Blog',
    },
    description: 'まだまだ、つくる途中。',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className=" mx-auto bg-white p-6 border border-green-200 md:p-8 md:w-180 md:rounded-xl">
          {children}
          <Nav tags={tags.contents} />
        </main>
        <Footer />
      </body>
    </html>
  );
}
