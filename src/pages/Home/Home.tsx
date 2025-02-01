import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Users, Database, Search, Smartphone, CreditCard, BadgeCheck, Library } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      title: "Vast Collection",
      description: "Access over 100,000 books, journals, and research papers"
    },
    {
      icon: <Database className="h-6 w-6 text-orange-600" />,
      title: "Digital Library",
      description: "Unlimited access to international academic databases"
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Study Spaces",
      description: "Modern collaborative and quiet study areas"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Extended Hours",
      description: "Open late during exam periods with 24/7 digital access"
    }
  ];

  const steps = [
    {
      icon: <Smartphone className="h-8 w-8 text-orange-600" />,
      number: "01",
      title: "Online Application",
      description: "Fill out the membership form using our web portal or mobile app",
      detail: "Submit your personal details, student ID, and required documents"
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-orange-600" />,
      number: "02",
      title: "Application Review",
      description: "Library staff will review your application within 2-3 working days",
      detail: "You'll receive an email notification once approved"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-orange-600" />,
      number: "03",
      title: "Payment Process",
      description: "Visit the financial counter to complete your membership payment",
      detail: "Acceptable payment methods: Cash, Credit Card, or Bank Transfer"
    },
    {
      icon: <Library className="h-8 w-8 text-orange-600" />,
      number: "04",
      title: "Card Collection",
      description: "Visit the library with payment receipt to collect your membership card",
      detail: "Bring your university ID and payment confirmation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section with Background Pattern */}
      <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-center bg-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-transparent to-orange-50" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-100 text-orange-600 hover:bg-orange-100">
            Welcome to
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Open University of Sri Lanka Library
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your gateway to knowledge and academic excellence. Discover our world-class resources and research facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/membership-application')}>
              Start Your Application <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-orange-200 hover:bg-orange-100">
              <Search className="mr-2 h-4 w-4" /> Search Catalog
            </Button>
          </div>
        </div>
      </section>

            {/* Enhanced Steps Section with Timeline */}
            <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-600 hover:bg-orange-100">
              Getting Started
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to Apply for Your Membership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these four simple steps to become a member of our library
            </p>
          </div>
          
          {/* Timeline Steps */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-orange-200 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 relative bg-white z-10">
                    <CardHeader className="text-center">
                      {/* Number Badge */}
                      <div className="mx-auto mb-4">
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                          {step.icon}
                        </div>
                        <Badge className="absolute -top-3 -right-3 bg-orange-500 text-white hover:bg-orange-600">
                          {step.number}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                      <p className="text-gray-600 font-medium">{step.description}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 text-center">{step.detail}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Start Your Application <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-600 hover:bg-orange-100">
              Benefits
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Library?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience world-class facilities and resources designed to support your academic journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="space-y-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
