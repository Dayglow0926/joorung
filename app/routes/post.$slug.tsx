import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { mdParser } from '~/utils/mdParser';

export const loader: LoaderFunction = async ({ params }) => {
  const post = await mdParser(params.slug as string);

  if (!post) throw new Response('Not Found', { status: 404 });

  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default function BlogPost() {
  const post = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{post.date}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose prose-invert"
      />
    </div>
  );
}
