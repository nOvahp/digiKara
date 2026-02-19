'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Store, FolderKanban, FileText, BookOpen } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Helper for Item Styles
  const getItemClasses = (active: boolean) =>
    cn(
      'w-[20%] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all duration-300',
      active ? '-mt-4 pt-4 text-[#F7C61A]' : 'pt-2 group hover:opacity-80',
    );

  const getTextClasses = (active: boolean) =>
    cn(
      'text-[10px] sm:text-xs font-semibold whitespace-nowrap',
      active ? 'text-[#F7C61A]' : 'text-[#605F5F]',
    );

  const getIconColor = (active: boolean) => (active ? 'text-[#F7C61A]' : 'text-[#605F5F]');

  const [hasHojre, setHasHojre] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const hojreCreated = localStorage.getItem('hojre_created') === 'true';
    setHasHojre(hojreCreated);
  }, []);

  if (!isMounted || !hasHojre) return null;

  return (
    <div className="w-full fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none">
      <div className="relative w-full max-w-[440px] pointer-events-auto">
        <div className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2">
          <div className="w-full flex justify-between items-center px-4" dir="ltr">
            {/* School Project */}
            <div className={getItemClasses(false)}>
              <FolderKanban className={cn('w-6 h-6', getIconColor(false))} strokeWidth={1.5} />
              <div className={getTextClasses(false)}>پروژه مدرسه </div>
            </div>

            {/* Report */}
            <div className={getItemClasses(false)}>
              <FileText className={cn('w-6 h-6', getIconColor(false))} strokeWidth={1.5} />
              <div className={getTextClasses(false)}>گزارش</div>
            </div>

            {/* Home */}
            <Link
              href="/StudentDashboard"
              className={getItemClasses(
                isActive('/StudentDashboard') || isActive('/StudentDashboard/'),
              )}
            >
              <Home
                className={cn(
                  'w-6 h-6',
                  getIconColor(isActive('/StudentDashboard') || isActive('/StudentDashboard/')),
                )}
                strokeWidth={1.5}
              />
              <div
                className={getTextClasses(
                  isActive('/StudentDashboard') || isActive('/StudentDashboard/'),
                )}
              >
                صفحه اصلی
              </div>
            </Link>

            {/* Sale */}
            <Link
              href="/StudentDashboard/Sells"
              className={getItemClasses(isActive('/StudentDashboard/Sells'))}
            >
              <Store
                className={cn('w-6 h-6', getIconColor(isActive('/StudentDashboard/Sells')))}
                strokeWidth={1.5}
              />
              <div className={getTextClasses(isActive('/StudentDashboard/Sells'))}>عرضه تولیدات</div>
            </Link>

            {/* Education */}
            <Link
              href="https://digikara.c60.darkube.app/auth/login"
              className={getItemClasses(false)}
            >
              <BookOpen className={cn('w-6 h-6', getIconColor(false))} strokeWidth={1.5} />
              <div className={getTextClasses(false)}>آموزش</div>
            </Link>
          </div>

          {/* iOS Home Indicator Mockup */}
          <div className="w-[134px] h-[5px] bg-[#61656B] rounded-full mt-2 opacity-30" />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
