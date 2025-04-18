import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import CategoryPill from "@/components/category-pill";
import { getProducts, getCategories } from "@/lib/data";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: getCategories
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["/api/products", activeCategory],
    queryFn: () => getProducts(activeCategory || undefined)
  });

  const handleCategoryClick = (categorySlug: string | null) => {
    setActiveCategory(categorySlug);
  };

  return (
    <section className="py-16 bg-[#F8F5F1]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-3">Our Products</h2>
          <div className="w-20 h-1 bg-[#D4A55C] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Explore our carefully curated selection of premium dry fruits
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <CategoryPill 
            name="All"
            isActive={activeCategory === null}
            onClick={() => handleCategoryClick(null)}
          />
          
          {isLoadingCategories ? (
            // Skeleton loading for categories
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="w-24 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            ))
          ) : (
            categories?.map((category) => (
              <CategoryPill 
                key={category.id}
                name={category.name}
                isActive={activeCategory === category.slug}
                onClick={() => handleCategoryClick(category.slug)}
              />
            ))
          )}
        </div>
        
        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {/* Empty state when no products found */}
        {products?.length === 0 && !isLoadingProducts && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
            <button 
              onClick={() => setActiveCategory(null)}
              className="mt-4 text-[#5E8B3F] hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
