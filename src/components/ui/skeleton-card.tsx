import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const JobCardSkeleton = () => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-16 w-full mb-4" />
    <div className="flex gap-2">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
  </Card>
);

export const ProfessionalCardSkeleton = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center text-center mb-4">
      <Skeleton className="w-20 h-20 rounded-full mb-3" />
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-5 w-20 mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
    <div className="space-y-3 mb-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-12 w-full mb-4" />
    <div className="flex gap-2 mb-4">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-9 flex-1" />
      <Skeleton className="h-9 flex-1" />
    </div>
  </Card>
);

export const MessageCardSkeleton = () => (
  <div className="flex gap-3 p-4 border-b border-border">
    <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export const DashboardStatSkeleton = () => (
  <Card className="p-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  </Card>
);
