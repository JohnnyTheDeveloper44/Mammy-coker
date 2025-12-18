import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Navbar } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Star, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NoProfessionalsFound } from '@/components/ui/empty-state';
import { ProfessionalCardSkeleton } from '@/components/ui/skeleton-card';
import PaginationControls from '@/components/ui/PaginationControls';
import { usePagination } from '@/hooks/usePagination';

const Professionals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [minRating, setMinRating] = useState([0]);
  const [loading] = useState(false);

  // TODO: Supabase Integration - Fetch professionals
  // 1. Create 'professionals' table: id, user_id, name, category, location, experience, rating, skills[], bio, availability
  // 2. Enable RLS for public read access
  // 3. Fetch with filters:
  //    let query = supabase.from('professionals').select('*')
  //    if (selectedCategory !== 'all') query = query.eq('category', selectedCategory)
  //    if (selectedLocation !== 'all') query = query.eq('location', selectedLocation)
  //    if (selectedAvailability !== 'all') query = query.eq('availability', selectedAvailability)
  //    if (minRating[0] > 0) query = query.gte('rating', minRating[0])
  //    if (searchTerm) query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`)
  // Use mock data from outside component

  const categories = ['all', 'Carpentry', 'Electrical', 'Plumbing', 'Masonry', 'Tailoring', 'Catering', 'Construction', 'Welding', 'Painting'];
  const locations = ['all', 'Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu', 'Port Loko'];
  const availabilityOptions = ['all', 'Available', 'Busy'];

  const filteredProfessionals = useMemo(() => {
    return mockProfessionalsData.filter((professional) => {
      const matchesSearch = 
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        professional.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || professional.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || professional.location === selectedLocation;
      const matchesAvailability = selectedAvailability === 'all' || professional.availability === selectedAvailability;
      const matchesRating = professional.rating >= minRating[0];
      
      return matchesSearch && matchesCategory && matchesLocation && matchesAvailability && matchesRating;
    });
  }, [searchTerm, selectedCategory, selectedLocation, selectedAvailability, minRating]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedAvailability('all');
    setMinRating([0]);
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedLocation !== 'all',
    selectedAvailability !== 'all',
    minRating[0] > 0,
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Location</label>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger>
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc === 'all' ? 'All Locations' : loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Availability</label>
        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="Any Availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt === 'all' ? 'Any Availability' : opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Minimum Rating: {minRating[0]} stars
        </label>
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          max={5}
          step={0.5}
          className="py-4"
        />
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="font-heading text-4xl font-bold mb-4">Find Skilled Professionals</h1>
          <p className="text-muted-foreground text-lg">
            Connect with verified professionals across Sierra Leone
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="p-6 mb-8 card-shadow animate-fade-in-up stagger-1 opacity-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search by name, skill, or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal size={16} className="mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2" variant="secondary">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-2">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc === 'all' ? 'All Locations' : loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt === 'all' ? 'Any' : opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X size={14} className="cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </Badge>
                )}
                {selectedLocation !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedLocation}
                    <X size={14} className="cursor-pointer" onClick={() => setSelectedLocation('all')} />
                  </Badge>
                )}
                {selectedAvailability !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedAvailability}
                    <X size={14} className="cursor-pointer" onClick={() => setSelectedAvailability('all')} />
                  </Badge>
                )}
                {minRating[0] > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {minRating[0]}+ stars
                    <X size={14} className="cursor-pointer" onClick={() => setMinRating([0])} />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Results Count */}
        <p className="text-muted-foreground mb-4">
          {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
        </p>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProfessionalCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <NoProfessionalsFound onClear={clearFilters} />
        ) : (
          <ProfessionalsList professionals={filteredProfessionals} />
        )}
      </div>

      <Footer />
    </div>
  );
};

// Separate component to handle pagination
const ProfessionalsList = ({ professionals }: { professionals: typeof mockProfessionalsData }) => {
  const { currentPage, totalPages, paginatedItems, goToPage, hasNextPage, hasPrevPage } = usePagination({
    items: professionals,
    itemsPerPage: 6,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map((professional, index) => (
          <Card key={professional.id} className="p-6 hover-lift animate-fade-in-up opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
            <Link to={`/professionals/${professional.id}`}>
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="w-20 h-20 mb-3">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {professional.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-heading text-xl font-semibold mb-1">{professional.name}</h3>
                <Badge className="mb-2">{professional.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin size={14} />
                  {professional.location}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">{professional.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Star size={14} className="fill-accent text-accent" />
                    Rating
                  </span>
                  <span className="font-medium">{professional.rating} ({professional.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={professional.availability === 'Available' ? 'default' : 'secondary'}>
                    {professional.availability}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-foreground mb-4 line-clamp-2">{professional.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {professional.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="hero" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Message
                </Button>
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
const mockProfessionalsData = [
  {
    id: '1',
    name: 'Ibrahim Kamara',
    category: 'Carpentry',
    location: 'Freetown',
    experience: '8 years',
    rating: 4.9,
    reviews: 32,
    skills: ['Furniture Making', 'Cabinet Installation', 'Custom Work'],
    bio: 'Expert carpenter specializing in custom furniture and installations',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Fatmata Sesay',
    category: 'Electrical',
    location: 'Bo',
    experience: '6 years',
    rating: 4.8,
    reviews: 28,
    skills: ['Wiring', 'Solar Installation', 'Repairs'],
    bio: 'Licensed electrician with commercial and residential experience',
    availability: 'Available',
  },
  {
    id: '3',
    name: 'Mohamed Bangura',
    category: 'Plumbing',
    location: 'Kenema',
    experience: '10 years',
    rating: 5.0,
    reviews: 45,
    skills: ['Pipe Installation', 'Water Systems', 'Repairs'],
    bio: 'Master plumber with expertise in modern water systems',
    availability: 'Busy',
  },
  {
    id: '4',
    name: 'Aminata Conteh',
    category: 'Tailoring',
    location: 'Freetown',
    experience: '12 years',
    rating: 4.7,
    reviews: 56,
    skills: ['Dress Making', 'Alterations', 'Traditional Wear'],
    bio: 'Expert tailor specializing in traditional and modern African designs',
    availability: 'Available',
  },
  {
    id: '5',
    name: 'Samuel Koroma',
    category: 'Masonry',
    location: 'Makeni',
    experience: '15 years',
    rating: 4.9,
    reviews: 67,
    skills: ['Brick Laying', 'Concrete Work', 'Tiling'],
    bio: 'Master mason with experience in residential and commercial projects',
    availability: 'Available',
  },
  {
    id: '6',
    name: 'Mariama Jalloh',
    category: 'Catering',
    location: 'Freetown',
    experience: '9 years',
    rating: 4.6,
    reviews: 41,
    skills: ['Event Catering', 'Traditional Cuisine', 'Pastries'],
    bio: 'Professional caterer for weddings, parties, and corporate events',
    availability: 'Busy',
  },
  {
    id: '7',
    name: 'Abdul Rahman',
    category: 'Carpentry',
    location: 'Bo',
    experience: '5 years',
    rating: 4.5,
    reviews: 19,
    skills: ['Door Installation', 'Roofing', 'Repairs'],
    bio: 'Skilled carpenter with focus on home improvement projects',
    availability: 'Available',
  },
  {
    id: '8',
    name: 'Isatu Mansaray',
    category: 'Electrical',
    location: 'Freetown',
    experience: '7 years',
    rating: 4.8,
    reviews: 34,
    skills: ['Industrial Wiring', 'Generator Installation', 'Maintenance'],
    bio: 'Industrial electrician with expertise in power systems',
    availability: 'Available',
  },
];

export default Professionals;
