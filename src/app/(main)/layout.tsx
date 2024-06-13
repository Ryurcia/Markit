import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
