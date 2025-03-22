import { Beaker, BookOpen, Code, Star, Tag } from 'lucide-react';
import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const loader: LoaderFunction = async () => {
  const response = path.join(process.cwd(), 'contents', '__posts');
  const files = fs.readdirSync(response);

  const posts = files.map((file) => {
    const slug = file.replace('.md', '');
    const { data } = matter(fs.readFileSync(path.join(response, file), 'utf8'));

    return {
      slug,
      ...data,
    };
  });

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-8">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
            >
              <Beaker className="h-4 w-4" />
              모든 실험
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Star className="h-4 w-4" />
              인기 실험
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
              위키 문서
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Code className="h-4 w-4" />
              코드 실행 환경
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Tag className="h-4 w-4" />
              태그 모음
            </Link>
            <div className="mt-6">
              <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">
                카테고리
              </h3>
              <div className="grid gap-1">
                <Link
                  to="#"
                  className="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  프론트엔드
                </Link>
                <Link
                  to="#"
                  className="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  백엔드
                </Link>
                <Link
                  to="#"
                  className="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  데이터 시각화
                </Link>
                <Link
                  to="#"
                  className="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  알고리즘
                </Link>
                <Link
                  to="#"
                  className="rounded-md px-4 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  성능 최적화
                </Link>
              </div>
            </div>
          </nav>
        </aside>
        <main className="flex w-full flex-col gap-6 py-6 lg:py-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              주광의 실험 연구소에 오신 것을 환영합니다
            </h1>
            <p className="text-muted-foreground">
              다양한 개발 실험과 아이디어를 기록하고 공유하는 공간입니다. 실험
              과정과 결과를 확인하고, 직접 코드를 실행해볼 수 있습니다.
            </p>
          </div>

          <div>
            {posts.map((post: Post) => (
              <div
                key={post.slug}
                className="border-b border-gray-200 pb-4 dark:bg-gray-900 dark:text-white"
              >
                <Link to={`/post/${post.slug}`}>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-500 text-sm">{post.date}</p>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 주광의 실험 연구소. 모든 실험은
            공개적으로 공유됩니다.
          </p>
          <div className="flex gap-4">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              소개
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              기여하기
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
