import path from 'path';
import fs from 'fs';
import { LoaderFunction } from '@remix-run/node';
import matter from 'gray-matter';
import { Link, useLoaderData } from '@remix-run/react';

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

export default function Posts() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      {posts.map((post: Post) => (
        <div
          key={post.slug}
          className="border-b border-gray-200 pb-4 text-white"
        >
          <Link to={`/post/${post.slug}`}>
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
