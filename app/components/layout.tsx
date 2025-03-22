import { Outlet } from '@remix-run/react';
import ToggleTheme from './common/ToggleTheme';
import { FlaskConical } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">주광의 실험 연구소</span>
          </div>
          <ToggleTheme />
        </div>
      </header>
      <div className="mx-auto ">
        <Outlet />
      </div>
    </div>
  );
}
