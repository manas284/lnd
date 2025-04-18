import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <a className="block">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-60 object-cover object-center"
          />
        </a>
      </Link>
      <div className="p-6">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {product.categoryId === 1 ? "Nuts" : 
           product.categoryId === 2 ? "Seeds" : 
           product.categoryId === 3 ? "Dried Fruits" : "Gift Boxes"}
        </span>
        
        <Link href={`/products/${product.slug}`}>
          <a className="block">
            <h3 className="text-xl font-bold font-['Poppins'] mt-3 mb-2">{product.name}</h3>
          </a>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">
            ₹{product.price}
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.discountPrice}
              </span>
            )}
          </span>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full transition text-sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
