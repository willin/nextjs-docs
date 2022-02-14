import { DocumentTextIcon } from '@heroicons/react/outline';
import { useI18n } from 'next-rosetta';
import { GithubConfig } from '~/config';
import { Category } from '~/entities/category';

export function EditOnGithub({
  locale,
  current
}: {
  locale: string;
  current: Category;
}) {
  const i18n = useI18n();
  const { t } = i18n;
  return (
    <>
      <a
        href={`http://github.com/${GithubConfig.repo}/edit/${GithubConfig.branch}/contents/${locale}${current.realPath}`}
        target='_blank'
        rel='noopener noreferrer'>
        <DocumentTextIcon
          className='inline-block h-6 w-6 align-text-bottom'
          aria-hidden='true'
        />
        <span>{t('common.edit_on_github')}</span>
      </a>
    </>
  );
}
