import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Truck, Shield, Package, RefreshCw, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/product-card";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";

const ProductDetail = () => {
  const [match, params] = useRoute("/products/:slug");
  const slug = params?.slug;

  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Query to get product details
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [`/api/products/${slug}`],
    queryFn: () => getProductBySlug(slug || ""),
    enabled: !!slug
  });

  // Query to get related products
  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery({
    queryKey: [`/api/products/related/${slug}`],
    queryFn: () => getRelatedProducts(slug || "", 4),
    enabled: !!slug
  });

  // Handle quantity change
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // If product is still loading, show skeleton
  if (isLoadingProduct) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="bg-gray-300 rounded-lg h-96 animate-pulse"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg h-24 animate-pulse"></div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-3/4 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-1/3 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-full h-24 bg-gray-300 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="flex space-x-3">
                  <div className="w-20 h-10 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="w-20 h-10 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="w-20 h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If product not found, show error
  if (!product && !isLoadingProduct) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">We couldn't find the product you're looking for.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </section>
    );
  }

  // Sample product images for the gallery (since we only have one image in our data model)
  const productImages = [
    product?.imageUrl,
    "https://images.unsplash.com/photo-1617194242632-9826c47c6985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590081535908-ed88079c9afa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1623428454614-abaf7c1d4543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <Link href="/products">
            <a className="text-[#5E8B3F] hover:underline inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </a>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-[#F8F5F1] rounded-lg overflow-hidden mb-4">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product?.name} 
                className="w-full h-96 object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`bg-[#F8F5F1] rounded-lg overflow-hidden cursor-pointer ${activeImageIndex === index ? 'ring-2 ring-[#5E8B3F]' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product?.name} image ${index + 1}`} 
                    className="w-full h-24 object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <span className="text-sm font-semibold text-[#5E8B3F] bg-[#5E8B3F]/10 px-3 py-1 rounded-full">
              {product?.categoryId === 1 ? "Nuts" : 
               product?.categoryId === 2 ? "Seeds" : 
               product?.categoryId === 3 ? "Dried Fruits" : "Gift Boxes"}
            </span>
            
            <h1 className="text-3xl font-['Playfair_Display'] font-bold mt-4 mb-2">{product?.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-[#D4A55C] mr-2">
                <Star className="fill-[#D4A55C]" size={18} />
                <Star className="fill-[#D4A55C]" size={18} />
                <Star className="fill-[#D4A55C]" size={18} />
                <Star className="fill-[#D4A55C]" size={18} />
                <StarHalf className="fill-[#D4A55C]" size={18} />
              </div>
              <span className="text-gray-500">(24 reviews)</span>
            </div>
            
            <div className="text-2xl font-bold mb-6">
              ₹{product?.price} 
              {product?.discountPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.discountPrice}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">
              {product?.description} Our products are sourced from the finest farms and processed with utmost care to preserve their natural flavor and nutritional value.
            </p>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Size</h3>
              <div className="flex space-x-3">
                <button 
                  className={`border-2 ${activeSize === '250g' ? 'border-[#5E8B3F] text-[#5E8B3F]' : 'border-gray-300'} px-4 py-2 rounded-md font-medium`}
                  onClick={() => setActiveSize('250g')}
                >
                  250g
                </button>
                <button 
                  className={`border-2 ${activeSize === '500g' ? 'border-[#5E8B3F] text-[#5E8B3F]' : 'border-gray-300'} px-4 py-2 rounded-md font-medium`}
                  onClick={() => setActiveSize('500g')}
                >
                  500g
                </button>
                <button 
                  className={`border-2 ${activeSize === '1kg' ? 'border-[#5E8B3F] text-[#5E8B3F]' : 'border-gray-300'} px-4 py-2 rounded-md font-medium`}
                  onClick={() => setActiveSize('1kg')}
                >
                  1kg
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-4 py-2 rounded-l-md"
                  onClick={decrementQuantity}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <Input 
                  type="number" 
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center py-2 border-t border-b focus:outline-none rounded-none"
                />
                <button 
                  className="bg-gray-200 px-4 py-2 rounded-r-md"
                  onClick={incrementQuantity}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Button 
                className="bg-[#5E8B3F] hover:bg-[#5E8B3F]/90 text-white font-['Poppins'] font-semibold px-8 py-3 rounded-full flex-grow"
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-[#5E8B3F] text-[#5E8B3F] hover:bg-[#5E8B3F] hover:text-white px-4 py-3 rounded-full"
              >
                <Heart size={20} />
              </Button>
            </div>
            
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Truck className="text-[#5E8B3F] mr-3" />
                  <span className="text-sm">Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center">
                  <Shield className="text-[#5E8B3F] mr-3" />
                  <span className="text-sm">100% Quality Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Package className="text-[#5E8B3F] mr-3" />
                  <span className="text-sm">Premium Packaging</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="text-[#5E8B3F] mr-3" />
                  <span className="text-sm">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="border-b w-full justify-start rounded-none bg-transparent">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#5E8B3F] data-[state=active]:text-[#5E8B3F] bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#5E8B3F] data-[state=active]:text-[#5E8B3F] bg-transparent"
              >
                Nutrition
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#5E8B3F] data-[state=active]:text-[#5E8B3F] bg-transparent"
              >
                Reviews (24)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <h3 className="text-xl font-bold mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">
                Our {product?.name} are carefully selected from the finest farms to ensure premium quality and taste. These are minimally processed to preserve their natural flavor, nutritional value, and crunchy texture.
              </p>
              <p className="text-gray-600 mb-4">
                Each batch undergoes rigorous quality checks to ensure that only the best make it to your table. The products are free from additives and preservatives, making them a healthy snacking option for everyone.
              </p>
              <h4 className="font-bold mt-6 mb-2">Storage Instructions:</h4>
              <p className="text-gray-600">
                Store in a cool, dry place away from direct sunlight. After opening, keep in an airtight container to maintain freshness.
              </p>
            </TabsContent>
            <TabsContent value="nutrition" className="py-6">
              <h3 className="text-xl font-bold mb-4">Nutritional Information</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Nutrient</th>
                      <th className="px-4 py-2 text-right">Amount per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2 font-medium">Calories</td>
                      <td className="px-4 py-2 text-right">553 kcal</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2 font-medium">Protein</td>
                      <td className="px-4 py-2 text-right">18g</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2 font-medium">Carbohydrates</td>
                      <td className="px-4 py-2 text-right">30g</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2 font-medium">Fat</td>
                      <td className="px-4 py-2 text-right">44g</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2 font-medium">Fiber</td>
                      <td className="px-4 py-2 text-right">3.3g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                *Values are approximate and may vary based on specific batch.
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">P</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Priya S.</h4>
                      <div className="flex text-[#D4A55C] text-sm">
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    These are the freshest and most flavorful I've ever had. The packaging was also excellent!
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Rahul K.</h4>
                      <div className="flex text-[#D4A55C] text-sm">
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Great quality, delivered on time, and the taste is exceptional. Will definitely order again!
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Ananya M.</h4>
                      <div className="flex text-[#D4A55C] text-sm">
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                        <Star className="fill-[#D4A55C]" size={14} />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Perfect for gifting! The packaging was elegant and premium. My family loved it.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-8">You May Also Like</h2>
          
          {isLoadingRelated ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-[#F8F5F1] rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
