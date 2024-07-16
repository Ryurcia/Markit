'use client';
import { MdRefresh } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Refresh = () => {
  const router = useRouter();

  return <MdRefresh className={`cursor-pointer hover:rotate-[90deg]`} onClick={() => router.refresh()} fontSize={20} />;
};

export default Refresh;
