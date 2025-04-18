import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import TestimonialCard from "@/components/testimonial-card";
import { getFeaturedProducts, getTestimonials } from "@/lib/data";

const Home = () => {
  const { data: featuredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["/api/products/featured"],
    queryFn: getFeaturedProducts
  });

  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryKey: ["/api/testimonials"],
    queryFn: getTestimonials
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-[#F8F5F1]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-lg">
            <h1 className="text-white text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4 drop-shadow-md">
              Premium Quality Dry Fruits
            </h1>
            <p className="text-white text-lg mb-8 drop-shadow-md">
              Welcome to Farmley, your one-stop destination for premium quality dry fruits. Our products are sourced from the finest farms to ensure freshness and nutrition in every bite.
            </p>
            <p className="text-white text-xl italic mb-8 font-medium">
              "Pure, Nutritious, and Delicious Dry Fruits."
            </p>
            <Link href="/products">
              <Button className="bg-[#5E8B3F] hover:bg-[#5E8B3F]/90 text-white font-['Poppins'] font-semibold px-8 py-6 rounded-full">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* About Farmley */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">About <span className="text-[#5E8B3F]">Farmley</span></h2>
            <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              At Farmley, we are passionate about bringing you the finest dry fruits directly from trusted farmers. Our commitment to quality and authenticity ensures that every product meets the highest standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-[#F8F5F1] rounded-lg p-8 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F] text-2xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12h12v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8Z" />
                  <path d="M10 2v10" />
                  <path d="M10 12 5 7" />
                  <path d="M10 12l5-5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-3">100% Natural and Fresh</h3>
              <p className="text-gray-600">Our products are pure, unprocessed, and free from artificial additives or preservatives.</p>
            </div>
            
            <div className="bg-[#F8F5F1] rounded-lg p-8 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F] text-2xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
                  <path d="M2 16s3-4 7-4 7 4 7 4" />
                  <path d="M22 16s-3-4-7-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-3">Ethically Sourced</h3>
              <p className="text-gray-600">We partner with farmers who follow sustainable and ethical farming practices.</p>
            </div>
            
            <div className="bg-[#F8F5F1] rounded-lg p-8 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F] text-2xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-['Poppins'] mb-3">Quality Assured</h3>
              <p className="text-gray-600">Every product undergoes rigorous quality checks to ensure premium standards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-[#F8F5F1]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">Our Featured Products</h2>
            <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Discover our handpicked selection of premium dry fruits, sourced from the finest farms around the world.
            </p>
          </div>
          
          {isLoadingProducts ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-60 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" className="border-2 border-[#5E8B3F] text-[#5E8B3F] hover:bg-[#5E8B3F] hover:text-white font-['Poppins'] font-semibold px-8 py-6 rounded-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
          </div>
          
          {isLoadingTestimonials ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-[#F8F5F1] rounded-lg p-8 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
