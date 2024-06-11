'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = () => {
    const supabase = createClient();
    supabase.auth.signOut().then((_res) => {
      router.replace('/home');
      return router.refresh();
    });
  };

  return (
    <button onClick={() => handleSignOut()} className={`w-full px-[15px] py-[5px] rounded font-semibold bg-accent2`}>
      Sign out
    </button>
  );
};

export default SignOutBtn;
