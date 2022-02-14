import { Fragment } from 'react';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import { TranslateIcon } from '@heroicons/react/outline';
import { classNames } from '~/utils/common';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function LocalesMenu({ locales }) {
  const router = useRouter();

  return (
    <Menu as='div' className='ml-3 relative'>
      <div>
        <Menu.Button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none mr-2'>
          <span className='sr-only'>Open user menu</span>
          <TranslateIcon className='block h-6 w-6' aria-hidden='true' />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {locales.map(([key, value]) => (
            <Menu.Item key={key}>
              {({ active }) => (
                <Link passHref={true} href={router.asPath} locale={key}>
                  <a
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}>
                    {value}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function LocalesMenuMobile({ locales }) {
  const router = useRouter();
  return (
    <div className='mt-3 px-2 space-y-1'>
      {locales.map(([key, value]) => (
        <Disclosure.Button
          key={`${key}-mobile`}
          as={Link}
          href={router.asPath}
          locale={key}>
          <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
            {value}
          </a>
        </Disclosure.Button>
      ))}
    </div>
  );
}
