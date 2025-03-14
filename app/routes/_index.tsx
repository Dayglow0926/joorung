import { LoaderFunction, redirect } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return redirect('/posts');
};

export default function Index() {
  return <></>;
}
