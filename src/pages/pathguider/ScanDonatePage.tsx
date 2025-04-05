
import { useState, useRef } from 'react';
import { Camera, Upload, QrCode, RefreshCw, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { assessDeviceCondition } from '@/lib/visionApi';
import BackButton from '@/components/shared/BackButton';

const ScanDonatePage = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [images, setImages] = useState<string[]>([]);
  const [deviceInfo, setDeviceInfo] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationCompleted, setDonationCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Clear previous assessment when new images are uploaded
    setAssessmentResult(null);

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

  const handleAssess = async () => {
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please add at least one image of the device.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    try {
      // Simulate scanning delay for UX
      setTimeout(async () => {
        const assessment = await assessDeviceCondition(images[0]);
        setAssessmentResult(assessment);
        setIsScanning(false);
      }, 2000);
    } catch (error) {
      console.error("Error assessing device:", error);
      toast({
        title: "Assessment Failed",
        description: "Failed to assess device condition. Please try again.",
        variant: "destructive"
      });
      setIsScanning(false);
    }
  };

  const handleSubmitDonation = async () => {
    if (!assessmentResult) {
      toast({
        title: "Assessment Required",
        description: "Please assess the device before submitting donation.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate donation submission
      setTimeout(() => {
        toast({
          title: "Donation Submitted",
          description: "Your device donation has been successfully submitted.",
        });
        setIsSubmitting(false);
        setDonationCompleted(true);
      }, 1500);
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit your donation. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  if (donationCompleted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <BackButton to="/pathguider-dashboard" label="Back to Dashboard" />
        
        <Card className="mt-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-t-lg">
            <CardTitle className="text-center text-2xl text-blue-800">Thank You for Your Donation!</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            
            <p className="text-center text-gray-700 mb-8">
              Your {assessmentResult.deviceType} has been successfully registered for donation.
              This device will help bridge the digital divide for students in need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">Device Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Device Type:</span>
                    <span className="font-medium">{assessmentResult.deviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Age:</span>
                    <span>{assessmentResult.estimatedAge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="capitalize">{assessmentResult.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donation Suitability:</span>
                    <span className="text-green-600 font-medium">{assessmentResult.donationSuitability}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-800 mb-2">Your Impact</h3>
                <p className="text-gray-700 mb-3">
                  By donating this device, you're making a real difference:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span>Providing digital access to a student in need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span>Reducing e-waste by extending device life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 rounded-full p-1 mr-2 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span>Supporting sustainable technology practices</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">What Happens Next?</h3>
              <ol className="space-y-2 pl-5 list-decimal">
                <li>Our refurbishment team will pick up the device</li>
                <li>The device will be wiped, cleaned, and updated</li>
                <li>It will be matched with a student in need</li>
                <li>You'll receive 350 Aagami coins as a thank you</li>
                <li>You'll get a notification when your device reaches its new owner</li>
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
      
      <h1 className="text-2xl font-bold mt-6 mb-2">Scan & Donate Device</h1>
      <p className="text-gray-600 mb-6">
        Give your old devices a new life by donating them to students in need. Simply scan your device to assess its condition and suitability for donation.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Scan Device</TabsTrigger>
          <TabsTrigger value="donate" disabled={!assessmentResult}>Donate Device</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Device Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden border">
                    <img src={image} alt={`Device ${index + 1}`} className="w-full h-48 object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                ))}
                
                {images.length === 0 && (
                  <div className="border border-dashed rounded-lg flex items-center justify-center p-12 col-span-full">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload device images</p>
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
                  Take Photo
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
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toast({
                    title: "QR Scan",
                    description: "QR code scanning functionality coming soon!",
                  })}
                  className="flex-1"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR
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
              <CardTitle>Device Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Device model (optional)"
                  value={deviceInfo}
                  onChange={(e) => setDeviceInfo(e.target.value)}
                />
                
                <div ref={scannerRef} className="w-full">
                  {isScanning ? (
                    <div className="text-center p-6 space-y-4">
                      <RefreshCw className="mx-auto h-8 w-8 text-primary animate-spin" />
                      <p>Scanning and assessing device...</p>
                      <Progress value={55} className="w-full" />
                    </div>
                  ) : assessmentResult ? (
                    <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-lg">Assessment Results</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Device Type</p>
                          <p className="font-medium">{assessmentResult.deviceType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Brand</p>
                          <p className="font-medium">{assessmentResult.brand}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estimated Age</p>
                          <p>{assessmentResult.estimatedAge}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Condition</p>
                          <p>{assessmentResult.condition}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Recycle Value</p>
                          <p>₹{assessmentResult.recycleValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Donation Suitability</p>
                          <p className="font-medium text-green-600">{assessmentResult.donationSuitability}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Issues Detected</p>
                        <ul className="list-disc pl-5 mt-1">
                          {assessmentResult.issues.map((issue: string, i: number) => (
                            <li key={i} className="text-sm">{issue}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Recommendation</p>
                        <p className="text-green-600">{assessmentResult.recommendation}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setImages([]);
                  setDeviceInfo('');
                  setAssessmentResult(null);
                }}
                disabled={isScanning || images.length === 0}
              >
                Clear
              </Button>
              <Button 
                onClick={handleAssess}
                disabled={isScanning || images.length === 0}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : assessmentResult ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rescan
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Assess Device
                  </>
                )}
              </Button>
              {assessmentResult && (
                <Button onClick={() => setActiveTab('donate')} disabled={isScanning}>
                  Continue to Donation
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="donate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Device Assessment Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Device</p>
                      <p className="font-medium">{assessmentResult?.deviceType} ({assessmentResult?.brand})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Condition</p>
                      <p className="font-medium">{assessmentResult?.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Value</p>
                      <p className="font-medium">₹{assessmentResult?.recycleValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Donation Suitability</p>
                      <p className="font-medium text-green-600">{assessmentResult?.donationSuitability}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <Textarea 
                    placeholder="Any additional information about the device that might be helpful (optional)"
                    rows={4}
                  />
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Before Donating</h3>
                  <p className="text-sm text-gray-600 mb-2">Please ensure you have:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Backed up any important data</li>
                    <li>Removed any personal information</li>
                    <li>Returned the device to factory settings if possible</li>
                    <li>Included any relevant accessories (charger, cables)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Your Impact</h3>
                  <p className="text-sm text-gray-700">
                    This donation will help bridge the digital divide by providing a student with access to technology for their education.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActiveTab('scan')}
                >
                  Back to Scan
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitDonation}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete Donation
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScanDonatePage;
