import localFont from 'next/font/local';

const hind = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Hind/Hind-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Hind/Hind-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Hind/Hind-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
});

const poppins = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Poppins/Poppins-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Poppins/Poppins-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Poppins/Poppins-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
});

export { hind, poppins };
