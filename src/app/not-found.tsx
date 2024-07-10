import { poppins } from '@/utils/font.config';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className={`mt-4 text-h3 ${poppins.className} flex flex-col gap-3`}>
      <h1>Sorry the page you're looking for does not exists</h1>
      <Link className={`text-sub underline`} href={`/home`}>
        {' '}
        &lt; Go back
      </Link>
    </div>
  );
};

export default NotFound;
