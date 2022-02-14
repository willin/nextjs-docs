import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { LocalesMenu, LocalesMenuMobile } from './header/locales';
import { NavLinks, NavLinksMobile } from './header/nav';
import { ThemeToggle } from './atom/theme';
import { SidebarToggle } from './sidebar';

export function Header({ locales, nav, setOpen }) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-gray-800'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                  <div className='flex items-center'>
                    {setOpen && <SidebarToggle setOpen={setOpen} />}

                    <div className='flex-shrink-0'>
                      <Link href='/'>
                        <img
                          className='h-8 w-8 cursor-pointer'
                          src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                          alt='Workflow'
                        />
                      </Link>
                    </div>
                    <div className='hidden md:block'>
                      <NavLinks nav={nav} />
                    </div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-4 flex items-center md:ml-6'>
                      <LocalesMenu locales={locales} />
                      <ThemeToggle />
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XIcon className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <MenuIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                  <NavLinksMobile nav={nav} />
                </div>
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <LocalesMenuMobile locales={locales} />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
