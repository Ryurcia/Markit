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
      <div className={`bg-dark w-[300px] p-3 rounded hover:border-[1px] hover:border-primary`}>
        <div className={`flex items-center justify-between`}>
          <h1 className={`truncate text-sub font-semibold`}>{props.title}</h1>
          <p className={`text-sm `}>{moment(props.created_at).fromNow()}</p>
        </div>
        <p>{props.company}</p>
        <span className={`inline-block mt-3`}>
          ${props.price} {props.pay_by} payment
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
