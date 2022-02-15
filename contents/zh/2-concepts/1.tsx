import { useState } from 'react';

export function Demo() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>You clicked {counter} times</p>
      <button
        onClick={() => setCounter((t) => t + 1)}
        className='w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
        点击
      </button>
    </div>
  );
}
