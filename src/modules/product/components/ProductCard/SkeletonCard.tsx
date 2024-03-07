import { FC } from 'react';
import { Skeleton } from '@/shared/ui';

export const SkeletonCard: FC = () => {
  return (
    <div className="flex h-[300px] w-[200px] flex-col justify-between rounded-md border p-2">
      <Skeleton className=" h-14 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
