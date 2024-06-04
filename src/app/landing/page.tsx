import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { IoMenu } from 'react-icons/io5';
import { poppins, hind } from '@/utils/font.config';
import Link from 'next/link';
import { Guitar, Concert, Shoes } from '../../../public/assets/images/img_exports';
import { Delivery, Secure, Search, Completion } from '../../../public/assets/svgs/svg_exports';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlipWords } from '@/components/ui/flip-words';

const page = () => {
  return (
    <div className={`${hind.className} relative`}>
      {/* NAVBAR */}
      <div className='w-[85%] sticky top-0 mx-auto flex flex-row items-center justify-between py-[20px] md:w-[95%]'>
        <div className={`flex flex-row items-center gap-[32px]`}>
          <h1 className={`${poppins.className} font-semibold text-h3 text-primary`}>Markit</h1>
          <div className={` hidden flex-row gap-[16px] md:flex`}>
            <Link className={`${hind.className} font-light text-neutral`} href='/#faq'>
              FAQ
            </Link>
            <Link className={`${hind.className} font-light text-neutral`} href='/#how-it-works'>
              How it works
            </Link>
          </div>
        </div>
        <Link href={'/signup'} className={`${hind.className} hidden px-[30px] py-[10px] bg-primary rounded md:block`}>
          join now
        </Link>
        <div className={`flex items-center md:hidden`}>
          <Popover>
            <PopoverTrigger>
              <IoMenu fontSize={25} />
            </PopoverTrigger>
            <PopoverContent>
              <div className={`flex flex-col gap-[10px]`}>
                <Link className={`${hind.className} font-light text-[#17191c]`} href='/#faq'>
                  FAQ
                </Link>
                <Link className={`${hind.className} font-light text-[#17191c]`} href='/#how-it-works'>
                  How it works
                </Link>
                <Link href={'/signup'} className={`${hind.className} px-[10px] py-[5px] bg-primary rounded`}>
                  join now
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* HERO SECTION */}
      <section
        className={`h-auto py-[70px] flex flex-col items-center justify-center gap-[32px] lg:flex lg:flex-row-reverse lg:justify-around`}
      >
        <div className={`w-[300px] xl:hidden`}>
          <Image
            src={JSON.parse(JSON.stringify(Delivery))}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
            alt='delivery'
          />
        </div>
        {/* grid */}
        <div className={`hidden w-[470px] h-[715px] xl:grid xl:grid-cols-2 xl:grid-rows-4 xl:gap-[16px]`}>
          <Image
            className={`row-span-2`}
            src={JSON.parse(JSON.stringify(Guitar))}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt='guitar'
            priority={true}
          />
          <Image
            className={`row-start-3 row-span-2`}
            src={JSON.parse(JSON.stringify(Concert))}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt='concert'
            priority={true}
          />
          <Image
            className={`col-start-2 row-start-2 row-span-2`}
            src={JSON.parse(JSON.stringify(Shoes))}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            alt='shoes'
            priority={true}
          />
        </div>
        <div className={`flex flex-col items-center gap-[16px] lg:items-start`}>
          <h1
            className={`${poppins.className} text-center text-[22px] font-semibold px-[10px] md:text-h3 lg:text-left lg:text-h2`}
          >
            Join the Markitplace. <br /> Where you can find <br />
            <FlipWords duration={1500} words={['anything', 'everything']} />
          </h1>
          <a
            href='/signup'
            className='relative w-[150px]  inline-flex items-center justify-center px-[10px] py-[25px] overflow-hidden font-medium transition duration-300 ease-out  rounded group'
          >
            <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-accent1 group-hover:translate-x-0 ease'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
              </svg>
            </span>
            <span
              className={`absolute flex items-center justify-center text-lg text-center bg-primary w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease`}
            >
              join now
            </span>
            <span className='relative invisible' />
          </a>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section
        id='faq'
        className={`w-full py-[200px] animate-green-dream flex flex-col justify-center items-center gap-[60px] `}
      >
        <h1 className={`${poppins.className} text-h3 pt-6 font-semibold`}>FAQ</h1>
        <Accordion type='single' collapsible className={`w-full md:w-[550px]`}>
          <AccordionItem value='item-1'>
            <AccordionTrigger className={`${hind.className} font-semibold pl-[15px] text-base md:text-sub`}>
              Why should I join Markit?
            </AccordionTrigger>
            <AccordionContent className={`pl-[15px] text-base`}>
              Markit has everything and anything. You can securely browse our Markitplace and have no trouble finding
              things that meet your needs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className={`${hind.className} font-semibold pl-[15px] text-base md:text-sub`}>
              How do you combat scams and bots?
            </AccordionTrigger>
            <AccordionContent className={`pl-[15px] text-base`}>
              In order to do anything in Markit, you must create an account and Markit will send you an email
              verification to verify that you are indeed a real user.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className={`${hind.className} font-semibold pl-[15px] text-left text-base md:text-sub`}>
              Can you do more than just buy and sell on Markit?
            </AccordionTrigger>
            <AccordionContent className={`pl-[15px] text-base`}>
              Yes. Markit is more than just buying and selling. You are able to find jobs, houses, and services. Soon
              we'll be implementing communities.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      {/* TUT SECTION */}
      <section id='how-it-works' className={`w-full py-[200px] flex flex-col items-center justify-center gap-[64px]`}>
        <h1 className={`${poppins.className} text-h3 font-semibold`}>How does it work?</h1>
        <div className={`w-full flex flex-row flex-wrap justify-center items-center gap-[240px]`}>
          <div className={`flex flex-col justify-center items-center `}>
            <div className={`w-[150px] h-[150px] mb-[12px] `}>
              <Image
                src={JSON.parse(JSON.stringify(Secure))}
                alt='fingerprint'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  padding: '20px',
                  backgroundColor: '#F5f5f5',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className={`flex flex-col items-center gap-[16px]`}>
              <h1 className={`text-h3 font-semibold`}>Create an account</h1>
              <p className={`w-[250px] text-center  text-[20px]`}>
                Create an account to verify you&apos;re not a bot and to view the markitplace
              </p>
            </div>
          </div>

          <div className={`flex flex-col justify-center items-center `}>
            <div className={`w-[150px] h-[150px] mb-[12px]`}>
              <Image
                src={JSON.parse(JSON.stringify(Search))}
                alt='search'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  padding: '20px',
                  backgroundColor: '#F5f5f5',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className={`flex flex-col items-center gap-[16px]`}>
              <h1 className={`text-h3 font-semibold`}>Browse the Markit</h1>
              <p className={`w-[250px] text-center text-[20px]`}>
                Look for anything inthe markitplace. There&apos;s always something for you.
              </p>
            </div>
          </div>

          <div className={`flex flex-col justify-center items-center `}>
            <div className={`w-[150px] h-[150px] mb-[12px]`}>
              <Image
                src={JSON.parse(JSON.stringify(Completion))}
                alt='complete'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  padding: '20px',
                  backgroundColor: '#F5f5f5',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className={`flex flex-col items-center gap-[16px]`}>
              <h1 className={`text-h3 font-semibold`}>Buy/Sell/Engage</h1>
              <p className={`w-[250px] text-center text-[20px]`}>
                Found something you&apos;re interested in? View the post and go from there
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA SECTION */}
      <section className={`py-[200px] animate-gray-fluff flex flex-col items-center justify-center gap-[30px]`}>
        <h1 className={`${poppins.className} text-h3 font-semibold text-center`}>
          Join now and start browsing the Markitplace!
        </h1>
        <a
          href='/signup'
          className='relative w-[150px]  inline-flex items-center justify-center px-[10px] py-[25px] overflow-hidden font-medium transition duration-300 ease-out  rounded group'
        >
          <span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-accent1 group-hover:translate-x-0 ease'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
            </svg>
          </span>
          <span
            className={`absolute flex items-center justify-center text-lg text-center bg-primary w-full h-full transition-all duration-300 transform group-hover:translate-x-full ease`}
          >
            join now
          </span>
          <span className='relative invisible' />
        </a>
      </section>
      {/* Footer */}
      <footer className={`py-[10px]`}>
        <h1 className={`pl-[10px] opacity-[40%] font-light`}>&copy; 2024 Markit | Built by Ryle Urcia</h1>
      </footer>
    </div>
  );
};

export default page;
