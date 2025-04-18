import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-['Playfair_Display'] text-3xl font-bold mb-6">Farmley</div>
            <p className="text-gray-400 mb-6">
              Premium quality dry fruits sourced directly from trusted farmers to your doorstep.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/10 hover:bg-primary border-none text-white hover:text-white rounded-full"
              >
                <Facebook size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/10 hover:bg-primary border-none text-white hover:text-white rounded-full"
              >
                <Instagram size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/10 hover:bg-primary border-none text-white hover:text-white rounded-full"
              >
                <Twitter size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white/10 hover:bg-primary border-none text-white hover:text-white rounded-full"
              >
                <Linkedin size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-['Poppins'] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-400 hover:text-white transition-colors">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-['Poppins'] mb-6">Customer Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Return Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold font-['Poppins'] mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates on new products and promotions.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your Email" 
                className="rounded-l-md rounded-r-none bg-white/10 border-0 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="rounded-l-none rounded-r-md bg-primary hover:bg-primary/90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paper-plane">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2023 Farmley. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
