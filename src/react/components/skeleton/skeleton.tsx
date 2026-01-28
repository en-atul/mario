import { type ComponentProps } from 'react';
import { cn } from '../../utils/cn';

export type SkeletonProps = ComponentProps<'div'>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200', className)}
      {...props}
    />
  );
};
