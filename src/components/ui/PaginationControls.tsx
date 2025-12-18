import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Always show first page
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Show pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="gap-1"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <Button
              key={index}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-[36px]"
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="flex items-center px-2 text-muted-foreground">
              {page}
            </span>
          )
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="gap-1"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default PaginationControls;