import { useI18n } from 'next-rosetta';
import ActiveLink from '../atom/active-link';

export function NavLinks({ nav }) {
  const i18n = useI18n();
  const { t } = i18n;

  return (
    <div className='ml-10 flex items-baseline space-x-4'>
      {nav.map((item) => (
        <ActiveLink
          key={item.slug}
          activeClassName={'active'}
          href={`/${item.slug}`}>
          <a className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
            {t(`categories.${item.slug}`)}
          </a>
        </ActiveLink>
      ))}
    </div>
  );
}
