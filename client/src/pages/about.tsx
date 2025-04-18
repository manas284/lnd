import { Leaf, Users, Box } from "lucide-react";

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">About Us</h2>
          <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
        </div>
        
        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Welcome to Farmley, where quality meets tradition. Our journey began with a simple goal — to bring the finest dry fruits from trusted farmers directly to your home. With a focus on purity and freshness, we ensure every bite is packed with nutrition and taste.
            </p>
            <p className="text-gray-600">
              At Farmley, we celebrate the rich heritage of dry fruits while embracing innovation to meet modern tastes. From carefully selecting premium nuts to delivering them with care, our passion drives everything we do.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1595425915002-5ccfeab33ee9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Our Farm" 
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-3 rounded-lg shadow-lg hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1573483587794-e2e24d648abc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Nuts Selection" 
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Sustainability */}
        <div className="bg-[#F8F5F1] rounded-lg p-10 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sustainable Farming" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6">Sustainability</h3>
              <p className="text-gray-600 mb-6">
                We believe in responsible sourcing and supporting local farming communities. Our partnerships with ethical farmers ensure that every product is grown using sustainable practices.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <Leaf className="text-[#5E8B3F]" size={16} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Eco-Friendly Practices</h4>
                    <p className="text-gray-600 text-sm">Minimizing carbon footprints and reducing waste.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <Users className="text-[#5E8B3F]" size={16} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Fair Trade Partnerships</h4>
                    <p className="text-gray-600 text-sm">Empowering farmers with fair wages and better opportunities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#5E8B3F]/10 w-8 h-8 rounded-full flex items-center justify-center">
                      <Box className="text-[#5E8B3F]" size={16} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold font-['Poppins'] mb-1">Sustainable Packaging</h4>
                    <p className="text-gray-600 text-sm">Using recyclable and biodegradable materials.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div>
          <h3 className="text-2xl font-['Playfair_Display'] font-bold text-center mb-10">Why Choose Us</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <h4 className="font-bold font-['Poppins'] mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Sourced from the best farms, processed with utmost care.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.93 4.93 14.14 14.14" />
                </svg>
              </div>
              <h4 className="font-bold font-['Poppins'] mb-2">No Additives</h4>
              <p className="text-gray-600 text-sm">Pure, natural goodness in every bite with no preservatives.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.01 6c-.39.03-.68.37-.68.76v1.88c-3.88.85-6.91 3.92-7.29 7.99-.02.26.15.51.41.57l1.76.41c.31.07.62-.12.69-.43.67-2.87 3.25-5.01 6.24-5.01h.11v1.99c0 .39.29.72.68.76.5.05.91-.28.91-.76V6.76c0-.48-.41-.81-.91-.76Z" />
                  <path d="M13.38 11.12c.15.15.31.28.48.42l5.5 4.11c.37.28.89.12 1.05-.31v-.89c0-1.07-.86-1.95-1.95-1.95h-3.6" />
                  <path d="M10.5 13.5c.15.15.31.28.48.42l5.5 4.11c.37.28.89.12 1.05-.31v-.89c0-1.07-.86-1.95-1.95-1.95h-3.6" />
                  <path d="M7.5 16.5c.15.15.31.28.48.42l5.5 4.11c.37.28.89.12 1.05-.31v-.89c0-1.07-.86-1.95-1.95-1.95h-3.6" />
                </svg>
              </div>
              <h4 className="font-bold font-['Poppins'] mb-2">Certified Excellence</h4>
              <p className="text-gray-600 text-sm">Compliant with industry standards for safety and quality.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-transform duration-300 hover:scale-[1.03]">
              <div className="bg-[#5E8B3F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#5E8B3F]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.364 5.636a9 9 0 0 1 .203 12.727" />
                  <path d="M16 8a5 5 0 0 1 0 8" />
                  <path d="M12 12h0M8 16a5 5 0 0 1 0-8" />
                  <path d="M5.636 18.364a9 9 0 0 1-.203-12.727" />
                </svg>
              </div>
              <h4 className="font-bold font-['Poppins'] mb-2">Customer Service</h4>
              <p className="text-gray-600 text-sm">Dedicated support to ensure a seamless shopping experience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
