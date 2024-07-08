'use client';
import moment from 'moment';
import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  created_at: string;
  company?: string;
  pay: number;
  tag: string;
}

const JobCard = ({ props }: { props: JobCardProps }) => {
  return (
    <Link href={`/jobs?id=${props.id}`}>
      <div className={`bg-dark w-[300px] p-3 rounded hover:border-[1px] hover:border-primary`}>
        <div className={`flex items-center justify-between`}>
          <h1 className={`truncate`}>{props.title}</h1>
          <p className={`text-sm `}>{moment(props.created_at).fromNow()}</p>
        </div>
        <p>{props.company}</p>
        <span className={`inline-block mt-3`}>${props.pay}/year</span>
      </div>
    </Link>
  );
};

export default JobCard;
