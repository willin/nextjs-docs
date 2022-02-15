import { BookOpenIcon } from '@heroicons/react/outline';
import { useI18n } from 'next-rosetta';
import Link from 'next/link';
import { useEffect } from 'react';
import { Category } from '~/entities/category';

export function SidebarToggle({ setOpen }) {
  return (
    <div className='md:hidden flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none  mr-2'>
      <BookOpenIcon
        onClick={() => setOpen((t) => !t)}
        className='block h-6 w-6'
        aria-hidden='true'
      />
    </div>
  );
}

function NavItems({
  items,
  slug,
  className
}: {
  slug?: string;
  items: Category[];
  className?: string;
}) {
  const i18n = useI18n();

  return (
    <ul className={className || ''}>
      {items
        .filter((item) => item.parentSlug === (slug || ''))
        .map((item) => (
          <li key={item.slug}>
            <Link passHref href={`/${i18n.locale()}${item.path}`}>
              <a className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
                {item.slug}
              </a>
            </Link>
            {items.filter((i) => i.parentSlug === item.slug).length > 0 &&
              NavItems({
                slug: item.slug,
                className: 'pl-2',
                items
              })}
          </li>
        ))}
    </ul>
  );
}

export function Sidebar({ open, setOpen, sidebar }) {
  function clickHandler() {
    setOpen((t) => !t);
    document.removeEventListener('click', clickHandler);
  }
  useEffect(() => {
    if (open) {
      document.removeEventListener('click', clickHandler);
      document.addEventListener('click', clickHandler);
    }
  }, [open]);

  return (
    <div
      className={`${
        open ? '' : '-translate-x-full'
      } bg-gray-800 text-gray-400  w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
      <NavItems items={sidebar} />
    </div>
  );
}
