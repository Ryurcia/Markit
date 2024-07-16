'use client';
import moment from 'moment';
import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  created_at: string;
  desc: string;
  company?: string;
  pay: number;
  tag: string;
}

const JobCard = ({ props }: { props: JobCardProps }) => {
  return (
    <Link href={`/jobs?id=${props.id}`}>
      <div
        className={`bg-dark w-[350px] h-[200px] flex flex-col justify-between p-3 rounded hover:border-[1px] hover:border-neutral`}
      >
        <div className={`flex-col`}>
          <h1 className={`truncate text-[20px] font-semibold`}>{props.title}</h1>
          <p className={`font-semibold`}>{props.company}</p>
        </div>

        <p className={`truncate`}>{props.desc}</p>
        <div className={`w-full flex items-center justify-between`}>
          <span className={`block mt-3 font-semibold text-[18px]`}>${props.pay}/year</span>
          <p className={`text-sm `}>{moment(props.created_at).fromNow()}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
