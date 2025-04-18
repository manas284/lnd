import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitContactForm } from "@/lib/data";

// Create a schema for the contact form
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  // Define form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission with mutation
  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">Contact Us</h2>
          <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            We'd love to hear from you! Whether you have a question, feedback, or simply want to learn more about our products, feel free to reach out.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold font-['Poppins'] mb-6">Get in Touch</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="focus-visible:ring-[#5E8B3F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Email" 
                          type="email" 
                          {...field} 
                          className="focus-visible:ring-[#5E8B3F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject" 
                          {...field} 
                          className="focus-visible:ring-[#5E8B3F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your Message" 
                          rows={5} 
                          {...field} 
                          className="focus-visible:ring-[#5E8B3F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#5E8B3F] hover:bg-[#5E8B3F]/90 text-white font-['Poppins'] font-semibold"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <h3 className="text-xl font-bold font-['Poppins'] mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <MapPin className="text-[#5E8B3F]" size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Address</h4>
                    <p className="text-gray-600">Farmley Office, 123 Organic Lane, Bangalore, Karnataka 560001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <Phone className="text-[#5E8B3F]" size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Phone</h4>
                    <p className="text-gray-600">+91-9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <Mail className="text-[#5E8B3F]" size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Email</h4>
                    <p className="text-gray-600">support@farmley.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <Clock className="text-[#5E8B3F]" size={18} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Business Hours</h4>
                    <p className="text-gray-600">Monday to Saturday, 9 AM to 6 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold font-['Poppins'] mb-3">Connect With Us</h4>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-[#5E8B3F]/10 hover:bg-[#5E8B3F] hover:text-white text-[#5E8B3F] border-none rounded-full"
                  >
                    <Facebook size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-[#5E8B3F]/10 hover:bg-[#5E8B3F] hover:text-white text-[#5E8B3F] border-none rounded-full"
                  >
                    <Instagram size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-[#5E8B3F]/10 hover:bg-[#5E8B3F] hover:text-white text-[#5E8B3F] border-none rounded-full"
                  >
                    <Twitter size={18} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-[#5E8B3F]/10 hover:bg-[#5E8B3F] hover:text-white text-[#5E8B3F] border-none rounded-full"
                  >
                    <Linkedin size={18} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 h-64">
              {/* Google Maps placeholder */}
              <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Google Maps Integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
