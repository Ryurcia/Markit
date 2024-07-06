'use client';
import moment from 'moment';
import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  title: string;
  created_at: string;
  company?: string;
  price: number;
  pay_by: string;
  tag: string;
}

const ServiceCard = ({ props }: { props: ServiceCardProps }) => {
  return (
    <Link href={`/services?sid=${props.id}`}>
      <div
        className={`bg-dark w-[350px] h-[150px] flex flex-col justify-between p-3 rounded hover:border-[1px] hover:border-primary`}
      >
        <div>
          <div className={`flex items-center justify-between`}>
            <h1 className={`w-full text-[20px] font-semibold`}>{props.title}</h1>
          </div>
          <p>{props.company}</p>
        </div>
        <div className={`flex items-center justify-between`}>
          <p>
            ${props.price} {props.pay_by} payment
          </p>
          <p className={`text-sm `}>{moment(props.created_at).fromNow()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
