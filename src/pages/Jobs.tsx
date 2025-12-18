import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaginationControls from '@/components/ui/PaginationControls';
import { usePagination } from '@/hooks/usePagination';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  // TODO: Supabase Integration - Fetch Jobs
  // 1. Create 'jobs' table: id, employer_id, title, company, location, category, salary_min, salary_max, type, description, requirements, benefits, status, created_at
  // 2. Enable RLS for public read access (status = 'active')
  // 3. Create 'employers' table linked to profiles for company info
  // 4. Fetch with filters:
  //    let query = supabase.from('jobs').select('*, employers(company_name, logo_url)').eq('status', 'active')
  //    if (selectedCategory !== 'all') query = query.eq('category', selectedCategory)
  //    if (selectedLocation !== 'all') query = query.eq('location', selectedLocation)
  //    if (selectedType !== 'all') query = query.eq('type', selectedType)
  //    if (searchTerm) query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  //    const { data: jobs } = await query

  // Use mock data from outside component

  const categories = ['all', 'Carpentry', 'Electrical', 'Plumbing', 'Construction', 'Masonry', 'Painting', 'Other'];
  const locations = ['all', 'Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'];
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Temporary'];

  // Client-side filtering logic
  const filteredJobs = useMemo(() => {
    return mockJobsData.filter(job => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;

      // Location filter
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;

      // Type filter
      const matchesType = selectedType === 'all' || job.type === selectedType;

      // Salary filter
      const matchesSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1];

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesSalary;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedType, salaryRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedType('all');
    setSalaryRange([0, 10000]);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedLocation !== 'all',
    selectedType !== 'all',
    salaryRange[0] !== 0 || salaryRange[1] !== 10000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-heading text-4xl font-bold mb-4">Find Your Next Job</h1>
          <p className="text-muted-foreground text-lg">
            Browse opportunities from trusted employers across Sierra Leone
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="p-6 mb-8 card-shadow animate-fade-in-up stagger-1 opacity-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search jobs by title, company, or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Mobile Filter Button */}
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden relative">
                    <Filter className="mr-2" size={16} />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    {/* Mobile Filters */}
                    <div>
                      <Label className="mb-2 block">Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map(loc => (
                            <SelectItem key={loc} value={loc}>
                              {loc.charAt(0).toUpperCase() + loc.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">Job Type</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 block">
                        Salary Range: {salaryRange[0]} - {salaryRange[1]} Le/month
                      </Label>
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        min={0}
                        max={10000}
                        step={500}
                        className="mt-2"
                      />
                    </div>

                    <Button onClick={clearFilters} variant="outline" className="w-full">
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Desktop Additional Filters */}
            <div className="hidden md:grid md:grid-cols-3 gap-3">
              <div>
                <Label className="mb-2 block text-sm">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc}>
                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block text-sm">Job Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block text-sm">
                  Salary: {salaryRange[0]} - {salaryRange[1]} Le/month
                </Label>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  min={0}
                  max={10000}
                  step={500}
                  className="mt-3"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory('all')}>
                        <X size={12} />
                      </button>
                    </Badge>
                  )}
                  {selectedLocation !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedLocation}
                      <button onClick={() => setSelectedLocation('all')}>
                        <X size={12} />
                      </button>
                    </Badge>
                  )}
                  {selectedType !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {selectedType}
                      <button onClick={() => setSelectedType('all')}>
                        <X size={12} />
                      </button>
                    </Badge>
                  )}
                  {(salaryRange[0] !== 0 || salaryRange[1] !== 10000) && (
                    <Badge variant="secondary" className="gap-1">
                      {salaryRange[0]}-{salaryRange[1]} Le
                      <button onClick={() => setSalaryRange([0, 10000])}>
                        <X size={12} />
                      </button>
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <Briefcase className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-heading text-xl font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={clearFilters} variant="hero">
              Clear All Filters
            </Button>
          </Card>
        ) : (
          <JobsList jobs={filteredJobs} />
        )}
      </div>

      <Footer />
    </div>
  );
};

// Separate component to handle pagination
const JobsList = ({ jobs }: { jobs: typeof mockJobsData }) => {
  const { currentPage, totalPages, paginatedItems, goToPage, hasNextPage, hasPrevPage } = usePagination({
    items: jobs,
    itemsPerPage: 5,
  });

  return (
    <>
      <div className="space-y-4">
        {paginatedItems.map((job, index) => (
          <Card key={job.id} className={`p-6 hover-lift cursor-pointer animate-fade-in-up opacity-0`} style={{ animationDelay: `${index * 0.1}s` }}>
            <Link to={`/jobs/${job.id}`}>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="font-heading text-2xl font-semibold mb-2">{job.title}</h2>
                      <p className="text-lg text-muted-foreground mb-2">{job.company}</p>
                    </div>
                    <Badge>{job.category}</Badge>
                  </div>

                  <p className="text-foreground mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {job.posted}
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2">
                  <Button variant="hero" className="flex-1 md:flex-initial">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-initial">
                    Save Job
                  </Button>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </>
  );
};

// Mock data moved outside component
const mockJobsData = [
  {
    id: '1',
    title: 'Experienced Carpenter Needed',
    company: 'ABC Construction',
    location: 'Freetown',
    category: 'Carpentry',
    salary: '3,000-5,000 Le/month',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Looking for an experienced carpenter for residential construction projects',
    salaryMin: 3000,
    salaryMax: 5000,
  },
  {
    id: '2',
    title: 'Licensed Electrician',
    company: 'PowerTech Solutions',
    location: 'Bo',
    category: 'Electrical',
    salary: '4,000-6,000 Le/month',
    type: 'Full-time',
    posted: '4 days ago',
    description: 'Commercial electrician needed for large-scale installations',
    salaryMin: 4000,
    salaryMax: 6000,
  },
  {
    id: '3',
    title: 'Plumbing Specialist',
    company: 'WaterWorks Ltd',
    location: 'Kenema',
    category: 'Plumbing',
    salary: '3,500-5,500 Le/month',
    type: 'Contract',
    posted: '1 week ago',
    description: 'Residential and commercial plumbing repairs and installations',
    salaryMin: 3500,
    salaryMax: 5500,
  },
  {
    id: '4',
    title: 'Construction Foreman',
    company: 'BuildTech Ltd',
    location: 'Freetown',
    category: 'Construction',
    salary: '5,000-7,000 Le/month',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Experienced foreman needed to oversee construction projects',
    salaryMin: 5000,
    salaryMax: 7000,
  },
  {
    id: '5',
    title: 'Part-time Electrician',
    company: 'Quick Fix Services',
    location: 'Bo',
    category: 'Electrical',
    salary: '2,500-3,500 Le/month',
    type: 'Part-time',
    posted: '5 days ago',
    description: 'Flexible hours for electrical repair work',
    salaryMin: 2500,
    salaryMax: 3500,
  },
  {
    id: '6',
    title: 'Master Carpenter',
    company: 'Premium Woodworks',
    location: 'Freetown',
    category: 'Carpentry',
    salary: '6,000-8,000 Le/month',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'High-end furniture and custom woodwork projects',
    salaryMin: 6000,
    salaryMax: 8000,
  },
  {
    id: '7',
    title: 'Junior Plumber',
    company: 'City Plumbing Co',
    location: 'Makeni',
    category: 'Plumbing',
    salary: '2,000-3,000 Le/month',
    type: 'Full-time',
    posted: '6 days ago',
    description: 'Entry-level plumber for residential repairs',
    salaryMin: 2000,
    salaryMax: 3000,
  },
  {
    id: '8',
    title: 'Site Supervisor',
    company: 'MegaBuild Inc',
    location: 'Freetown',
    category: 'Construction',
    salary: '7,000-9,000 Le/month',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Supervise construction sites and manage workers',
    salaryMin: 7000,
    salaryMax: 9000,
  },
];

export default Jobs;
