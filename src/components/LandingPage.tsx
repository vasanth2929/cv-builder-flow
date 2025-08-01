import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Palette, Download, Zap, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-resume.jpg";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from beautifully designed templates that make you stand out",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Customizable Design",
      description: "Personalize colors, fonts, and layouts to match your style",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Drag & Drop Builder",
      description: "Easily rearrange sections with our intuitive drag and drop interface",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF ready for any application",
    },
  ];

  const templates = [
    { name: "Modern", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { name: "Classic", color: "bg-gradient-to-br from-gray-700 to-gray-800" },
    { name: "Creative", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">ResumeBuilder</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/builder")}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            ✨ Build Professional Resumes in Minutes
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create Your Perfect{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Resume
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Build stunning, professional resumes with our intuitive drag-and-drop editor. 
            Choose from expertly designed templates and export to PDF instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate("/builder")}
              className="text-lg"
            >
              Start Building Now
            </Button>
            <Button variant="outline" size="xl" className="text-lg">
              View Templates
            </Button>
          </div>
          
          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Resume Builder Interface" 
              className="relative w-full rounded-2xl shadow-elegant"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our resume builder comes packed with features to help you create the perfect resume
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Style
          </h2>
          <p className="text-xl text-muted-foreground">
            Professional templates designed to make you stand out
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {templates.map((template, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className={`w-full h-48 rounded-lg ${template.color} mb-4 flex items-center justify-center text-white font-semibold`}>
                  {template.name} Template
                </div>
                <h3 className="font-semibold text-center">{template.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have created stunning resumes with our builder
          </p>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => navigate("/builder")}
            className="text-lg"
          >
            Create Your Resume Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 ResumeBuilder. Build your future with confidence.</p>
        </div>
      </footer>
    </div>
  );
}