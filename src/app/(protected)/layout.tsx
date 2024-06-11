import Navbar from '@/components/navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) return redirect('/signin');
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
