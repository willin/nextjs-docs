import { BookOpenIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';

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

export function Sidebar({ open, setOpen }) {
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
      <nav>
        <a
          href='#'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
          Home
        </a>
        <a
          href=''
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
          About
        </a>
        <a
          href=''
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
          Features
        </a>
        <a
          href=''
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white'>
          Pricing
        </a>
      </nav>
    </div>
  );
}
