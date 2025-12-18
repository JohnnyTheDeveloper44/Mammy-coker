import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, MessageSquare, FileX, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="rounded-full bg-muted p-4 mb-4">
      {icon || <FileX size={32} className="text-muted-foreground" />}
    </div>
    <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground max-w-md mb-6">{description}</p>
    {action && (
      action.href ? (
        <Link to={action.href}>
          <Button variant="hero">{action.label}</Button>
        </Link>
      ) : (
        <Button variant="hero" onClick={action.onClick}>{action.label}</Button>
      )
    )}
  </div>
);

export const NoJobsFound = ({ onClear }: { onClear?: () => void }) => (
  <EmptyState
    icon={<Briefcase size={32} className="text-muted-foreground" />}
    title="No jobs found"
    description="We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms."
    action={onClear ? { label: 'Clear Filters', onClick: onClear } : undefined}
  />
);

export const NoProfessionalsFound = ({ onClear }: { onClear?: () => void }) => (
  <EmptyState
    icon={<Users size={32} className="text-muted-foreground" />}
    title="No professionals found"
    description="We couldn't find any professionals matching your criteria. Try adjusting your filters."
    action={onClear ? { label: 'Clear Filters', onClick: onClear } : undefined}
  />
);

export const NoMessages = () => (
  <EmptyState
    icon={<MessageSquare size={32} className="text-muted-foreground" />}
    title="No messages yet"
    description="Start a conversation with professionals or employers to see messages here."
  />
);

export const NoSearchResults = ({ query }: { query: string }) => (
  <EmptyState
    icon={<Search size={32} className="text-muted-foreground" />}
    title="No results found"
    description={`We couldn't find anything matching "${query}". Try a different search term.`}
  />
);

export const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={<AlertCircle size={32} className="text-destructive" />}
    title="Something went wrong"
    description="We encountered an error loading this content. Please try again."
    action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
  />
);
