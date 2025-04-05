
import { useState, useRef } from 'react';
import { Camera, Upload, Send, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { assessDeviceCondition } from '@/lib/visionApi';
import { getLocationCoordinates } from '@/lib/googleApis';
import BackButton from '@/components/shared/BackButton';

const ReportEWastePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Preview the images
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImages(prev => [...prev, event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, we would use reverse geocoding here
          setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
          toast({
            title: "Location Detected",
            description: "Your current location has been set.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: error.message,
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please add at least one image of the e-waste.",
        variant: "destructive"
      });
      return;
    }
    
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please provide the location of the e-waste.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get coordinates from the location
      const coordinates = await getLocationCoordinates(location);
      
      // Analyze the e-waste images using Cloud Vision API
      const analysisResults = await assessDeviceCondition(images[0]);
      
      setAnalysis(analysisResults);
      setIsSubmitted(true);
      
      toast({
        title: "Report Submitted",
        description: "Your e-waste report has been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && analysis) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <BackButton to="/pathguider-dashboard" label="Back to Dashboard" />
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-100 to-teal-100 rounded-t-lg">
            <CardTitle className="text-center text-2xl text-green-800">Thank You for Your Report!</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">E-Waste Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Device Type</p>
                    <p className="font-medium">{analysis.deviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Age</p>
                    <p>{analysis.estimatedAge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Condition</p>
                    <p>{analysis.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Recycle Value</p>
                    <p>₹{analysis.recycleValue}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Issues</p>
                    <ul className="list-disc pl-5">
                      {analysis.issues.map((issue: string, i: number) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
                <p className="text-gray-700 mb-4">
                  By reporting this e-waste, you're preventing harmful materials from entering landfills and waterways.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Your Impact:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span>Saved up to 1.5kg of CO2 emissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span>Prevented toxic materials from entering the environment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span>Contributed to sustainable resource management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">What Happens Next?</h3>
              <ol className="space-y-2 pl-5 list-decimal">
                <li>Our team will review your report and verify the details</li>
                <li>A collection team will be assigned to your reported location</li>
                <li>You'll receive a notification when the e-waste is scheduled for pickup</li>
                <li>Once collected, you'll earn Aagami reward points for your contribution</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <Button onClick={() => window.location.href = "/pathguider-dashboard"} className="w-full md:w-auto">
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <BackButton to="/pathguider-dashboard" label="Back to Dashboard" />
      
      <h1 className="text-2xl font-bold mt-6 mb-4">Report E-Waste</h1>
      <p className="text-gray-600 mb-6">
        Help us clean up electronic waste in your area by reporting it. Take photos of the e-waste and provide its location.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload E-Waste Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border">
                  <img src={image} alt={`E-waste ${index + 1}`} className="w-full h-48 object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => removeImage(index)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="border border-dashed rounded-lg flex items-center justify-center p-12 col-span-full">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload images</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCapture}
                className="flex-1"
              >
                <Camera className="mr-2 h-4 w-4" />
                Capture Photo
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </Button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUseCurrentLocation}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>
              
              <Textarea
                placeholder="Describe the e-waste and its surroundings (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ReportEWastePage;
