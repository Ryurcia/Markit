import Navbar from '@/components/ui/navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect('/signin');
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
