import { Disclosure } from '@headlessui/react';
import { useI18n } from 'next-rosetta';
import Link from 'next/link';
import ActiveLink from '../atom/active-link';

export function NavLinks({ nav }) {
  const i18n = useI18n();
  const { t } = i18n;

  return (
    <div className='ml-10 flex items-baseline space-x-4'>
      {nav.map((item) => (
        <ActiveLink key={item.path} activeClassName={'active'} href={item.path}>
          <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
            {t(`categories.${item.slug}`)}
          </a>
        </ActiveLink>
      ))}
      <ActiveLink activeClassName={'active'} href={'/playground'}>
        <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
          {t('categories.playground')}
        </a>
      </ActiveLink>
    </div>
  );
}

export function NavLinksMobile({ nav }) {
  const i18n = useI18n();
  const { t } = i18n;

  return (
    <div className='ml-10 flex items-baseline space-x-4'>
      {nav.map((item) => (
        <Disclosure.Button
          key={`${item.slug}-mobile`}
          as={Link}
          href={item.path}>
          <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
            {t(`categories.${item.slug}`)}
          </a>
        </Disclosure.Button>
      ))}
      <Disclosure.Button as={Link} href='/playground'>
        <a className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'>
          {t('categories.playground')}
        </a>
      </Disclosure.Button>
    </div>
  );
}
