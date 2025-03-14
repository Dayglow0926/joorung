import { Link, Outlet } from '@remix-run/react';
import ToggleTheme from './common/ToggleTheme';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <nav className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
        <Link to={'/'}>
          <h1 className="text-2xl font-bold">📝 주렁 블로그</h1>
        </Link>
        <ToggleTheme />
      </nav>
      <main className="max-w-3xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
