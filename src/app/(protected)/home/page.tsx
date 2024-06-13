import { poppins } from '@/utils/font.config';
import SaleSection from './(sub-components)/SaleSection';
import SearchSection from './(sub-components)/SearchSection';

const page = () => {
  return (
    <div className={`w-full pb-5`}>
      <SearchSection />
      <SaleSection />
    </div>
  );
};

export default page;
