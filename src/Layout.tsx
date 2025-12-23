import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-main-1000 text-main-600">
      <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-main-300/20 blur-[120px] animate-float" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-main-100/20 blur-[140px] animate-float" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
        <Outlet />
      </div>
    </div>
  );
}
