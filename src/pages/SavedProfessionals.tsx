import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SavedProfessionals = () => {
  const { toast } = useToast();

  // TODO: Fetch saved professionals from Supabase
  const [savedPros, setSavedPros] = useState([
    {
      id: '1',
      name: 'John Kamara',
      category: 'Carpentry',
      location: 'Freetown',
      rating: 4.8,
      hourlyRate: '50',
      skills: ['Carpentry', 'Furniture Making', 'Cabinet Installation'],
      bio: 'Experienced carpenter with 10 years in residential construction',
      avatar: null,
    },
    {
      id: '2',
      name: 'Fatmata Sesay',
      category: 'Electrical',
      location: 'Bo',
      rating: 4.9,
      hourlyRate: '60',
      skills: ['Electrical', 'Wiring', 'Solar Installation'],
      bio: 'Licensed electrician specializing in commercial installations',
      avatar: null,
    },
  ]);

  const handleUnsave = (id: string) => {
    // TODO: Remove from saved_professionals in Supabase
    // await supabase
    //   .from('saved_professionals')
    //   .delete()
    //   .eq('employer_id', userId)
    //   .eq('professional_id', id);

    setSavedPros(savedPros.filter(pro => pro.id !== id));
    toast({
      title: 'Removed from Saved',
      description: 'Professional has been removed from your saved list.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard/employer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="font-heading text-4xl font-bold mb-8">Saved Professionals</h1>

        {savedPros.length === 0 ? (
          <Card className="p-12 text-center">
            <Bookmark className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="font-heading text-xl font-semibold mb-2">No Saved Professionals</h3>
            <p className="text-muted-foreground mb-6">
              Browse professionals and save them for later
            </p>
            <Link to="/professionals">
              <Button variant="hero">Browse Professionals</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedPros.map((pro) => (
              <Card key={pro.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={pro.avatar || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold mb-1">{pro.name}</h3>
                    <p className="text-muted-foreground mb-2">{pro.category}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-accent text-accent" />
                        <span>{pro.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span>{pro.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{pro.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pro.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold">{pro.hourlyRate} Le/hour</span>
                  <div className="flex gap-2">
                    <Link to={`/professionals/${pro.id}`}>
                      <Button variant="hero" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnsave(pro.id)}
                    >
                      <Bookmark size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProfessionals;
