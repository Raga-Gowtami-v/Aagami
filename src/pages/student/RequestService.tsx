
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";

const requestDeviceSchema = z.object({
  deviceType: z.string().min(1, "Device type is required"),
  purpose: z.string().min(10, "Please provide a detailed purpose (min 10 characters)"),
  duration: z.string().min(1, "Duration is required"),
  additionalInfo: z.string().optional(),
});

const requestFundingSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  purpose: z.string().min(10, "Please provide a detailed purpose (min 10 characters)"),
  urgency: z.enum(["low", "medium", "high"], {
    required_error: "Please select urgency level",
  }),
  additionalInfo: z.string().optional(),
});

const requestBooksSchema = z.object({
  bookNames: z.string().min(3, "Book names are required"),
  subject: z.string().min(1, "Subject is required"),
  grade: z.string().min(1, "Grade is required"),
  additionalInfo: z.string().optional(),
});

const RequestService = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const deviceForm = useForm<z.infer<typeof requestDeviceSchema>>({
    resolver: zodResolver(requestDeviceSchema),
    defaultValues: {
      deviceType: "",
      purpose: "",
      duration: "",
      additionalInfo: "",
    },
  });

  const fundingForm = useForm<z.infer<typeof requestFundingSchema>>({
    resolver: zodResolver(requestFundingSchema),
    defaultValues: {
      amount: "",
      purpose: "",
      urgency: "medium",
      additionalInfo: "",
    },
  });

  const booksForm = useForm<z.infer<typeof requestBooksSchema>>({
    resolver: zodResolver(requestBooksSchema),
    defaultValues: {
      bookNames: "",
      subject: "",
      grade: "",
      additionalInfo: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (uploadedFiles.length === 0) return [];
    
    const fileUrls: string[] = [];
    
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const fileRef = ref(storage, `requests/${userData?.uid}/${Date.now()}-${file.name}`);
      
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      fileUrls.push(downloadUrl);
      
      // Update progress
      setUploadProgress(Math.round(((i + 1) / uploadedFiles.length) * 100));
    }
    
    return fileUrls;
  };

  const onDeviceSubmit = async (data: z.infer<typeof requestDeviceSchema>) => {
    if (!userData) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a request",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload files if any
      const fileUrls = await uploadFiles();
      
      // Save request to Firestore
      await addDoc(collection(db, "requests"), {
        type: "device",
        userId: userData.uid,
        userName: userData.displayName,
        userEmail: userData.email,
        status: "pending",
        details: data,
        attachments: fileUrls,
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Request submitted",
        description: "Your device request has been submitted successfully!",
      });
      
      // Reset form
      deviceForm.reset();
      setUploadedFiles([]);
      setUploadProgress(0);
      
      // Redirect to dashboard
      navigate("/student-dashboard");
    } catch (error: any) {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFundingSubmit = async (data: z.infer<typeof requestFundingSchema>) => {
    if (!userData) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a request",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload files if any
      const fileUrls = await uploadFiles();
      
      // Save request to Firestore
      await addDoc(collection(db, "requests"), {
        type: "funding",
        userId: userData.uid,
        userName: userData.displayName,
        userEmail: userData.email,
        status: "pending",
        details: data,
        attachments: fileUrls,
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Request submitted",
        description: "Your funding request has been submitted successfully!",
      });
      
      // Reset form
      fundingForm.reset();
      setUploadedFiles([]);
      setUploadProgress(0);
      
      // Redirect to dashboard
      navigate("/student-dashboard");
    } catch (error: any) {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBooksSubmit = async (data: z.infer<typeof requestBooksSchema>) => {
    if (!userData) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a request",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload files if any
      const fileUrls = await uploadFiles();
      
      // Save request to Firestore
      await addDoc(collection(db, "requests"), {
        type: "books",
        userId: userData.uid,
        userName: userData.displayName,
        userEmail: userData.email,
        status: "pending",
        details: data,
        attachments: fileUrls,
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: "Request submitted",
        description: "Your books request has been submitted successfully!",
      });
      
      // Reset form
      booksForm.reset();
      setUploadedFiles([]);
      setUploadProgress(0);
      
      // Redirect to dashboard
      navigate("/student-dashboard");
    } catch (error: any) {
      toast({
        title: "Error submitting request",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Request a Service</h1>
      
      <Tabs defaultValue="device" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="device">Request a Device</TabsTrigger>
          <TabsTrigger value="funding">Request Funding</TabsTrigger>
          <TabsTrigger value="books">Request Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="device">
          <Card>
            <CardHeader>
              <CardTitle>Request a Device</CardTitle>
              <CardDescription>
                Fill out this form to request a laptop, tablet, or other device for your studies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...deviceForm}>
                <form onSubmit={deviceForm.handleSubmit(onDeviceSubmit)} className="space-y-6">
                  <FormField
                    control={deviceForm.control}
                    name="deviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Laptop, Tablet, Calculator" {...field} />
                        </FormControl>
                        <FormDescription>
                          Specify the type of device you need.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={deviceForm.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Explain how you will use this device for your education"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide detailed information about how this device will help your studies.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={deviceForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration Needed</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3 months, 1 year" {...field} />
                        </FormControl>
                        <FormDescription>
                          How long do you need to borrow this device?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={deviceForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any other details that might help us process your request"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Supporting Documents (Optional)</FormLabel>
                    <div className="mt-2 p-4 border border-dashed rounded-md text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('file-upload')?.click()}>
                      <UploadCloud className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOCX, JPG, PNG up to 5MB
                      </p>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        <ul className="text-sm">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                              <span>{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 p-0"
                              >
                                ✕
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>Request Funding</CardTitle>
              <CardDescription>
                Request financial assistance for school fees, educational materials, or other academic needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...fundingForm}>
                <form onSubmit={fundingForm.handleSubmit(onFundingSubmit)} className="space-y-6">
                  <FormField
                    control={fundingForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount Needed (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 5000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the amount you need in Indian Rupees.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={fundingForm.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Explain what the funding will be used for"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide detailed information about how this funding will be used.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={fundingForm.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="low" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Low (Needed within 3 months)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="medium" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Medium (Needed within 1 month)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="high" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                High (Needed within 2 weeks)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={fundingForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any other details that might help us process your request"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Supporting Documents (Optional)</FormLabel>
                    <div className="mt-2 p-4 border border-dashed rounded-md text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('funding-file-upload')?.click()}>
                      <UploadCloud className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOCX, JPG, PNG up to 5MB
                      </p>
                      <Input 
                        id="funding-file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        <ul className="text-sm">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                              <span>{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 p-0"
                              >
                                ✕
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle>Request Books</CardTitle>
              <CardDescription>
                Request textbooks, reference materials, or study guides for your courses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...booksForm}>
                <form onSubmit={booksForm.handleSubmit(onBooksSubmit)} className="space-y-6">
                  <FormField
                    control={booksForm.control}
                    name="bookNames"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book Names</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the books you need (one per line)"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Please list each book title on a new line. Include author if possible.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={booksForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Mathematics, Physics, History" {...field} />
                        </FormControl>
                        <FormDescription>
                          Which subject(s) are these books for?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={booksForm.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade/Class</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 9th, 10th, 12th" {...field} />
                        </FormControl>
                        <FormDescription>
                          Which grade level are you requesting books for?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={booksForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any other details that might help us process your request"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Supporting Documents (Optional)</FormLabel>
                    <div className="mt-2 p-4 border border-dashed rounded-md text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('books-file-upload')?.click()}>
                      <UploadCloud className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOCX, JPG, PNG up to 5MB
                      </p>
                      <Input 
                        id="books-file-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        <ul className="text-sm">
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                              <span>{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeFile(index)}
                                className="h-8 w-8 p-0"
                              >
                                ✕
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestService;
